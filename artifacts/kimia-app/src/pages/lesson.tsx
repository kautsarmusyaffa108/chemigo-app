import { useState, useEffect, useRef } from "react";
import { useRoute, useLocation } from "wouter";
import { useQuestions } from "@/hooks/use-kimia-api";
import { useUserProfile } from "@/hooks/use-user-profile";
import { X, Zap, CheckCircle2, XCircle, Trophy } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";

// ── Progress bar ──────────────────────────────────────────────
function ProgressBar({ value, max }: { value: number; max: number }) {
  const pct = max > 0 ? Math.round((value / max) * 100) : 0;
  return (
    <div className="h-4 bg-muted rounded-full overflow-hidden border-2 border-border">
      <motion.div
        className="h-full bg-primary rounded-full"
        initial={{ width: 0 }}
        animate={{ width: `${pct}%` }}
        transition={{ type: "spring", stiffness: 200, damping: 30 }}
      />
    </div>
  );
}

// ── Option button styles ───────────────────────────────────────
type OptionState = "idle" | "selected" | "correct" | "wrong" | "correct-unselected";

function optionClass(state: OptionState) {
  const base =
    "w-full p-4 md:p-5 rounded-2xl border-2 text-base md:text-lg font-bold transition-colors text-left select-none btn-push";
  switch (state) {
    case "selected":
      return `${base} bg-primary/10 border-primary text-primary shadow-[0_4px_0_0_hsl(195,100%,36%)]`;
    case "correct":
      return `${base} bg-correct border-correct text-white shadow-[0_4px_0_0_hsl(142,71%,30%)]`;
    case "wrong":
      return `${base} bg-destructive border-destructive text-white shadow-[0_3px_0_0_hsl(348,100%,44%)]`;
    case "correct-unselected":
      return `${base} bg-correct/20 border-correct text-correct shadow-none`;
    default:
      return `${base} bg-background border-border text-foreground hover:bg-muted shadow-[0_4px_0_0_hsl(214,32%,78%)]`;
  }
}

// ── Main component ────────────────────────────────────────────
export default function Lesson() {
  const [, params] = useRoute("/lesson/:id");
  const [, setLocation] = useLocation();
  const lessonId = params?.id ?? "l1";

  const { data: questions, isLoading: qLoading } = useQuestions({ lessonId });
  const { profile, updateEnergy, addExp, markLessonComplete } = useUserProfile();

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [status, setStatus] = useState<"idle" | "selected" | "correct" | "wrong">("idle");
  const [sessionExp, setSessionExp] = useState(0);
  const [isGameOver, setIsGameOver] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [shake, setShake] = useState(false);

  // Local energy copy so UI reflects instantly
  const [localEnergy, setLocalEnergy] = useState<number>(5);
  const energySynced = useRef(false);

  useEffect(() => {
    if (profile && !energySynced.current) {
      setLocalEnergy(profile.energy);
      energySynced.current = true;
    }
  }, [profile]);

  if (qLoading || !questions) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-spin rounded-full h-12 w-12 border-b-4 border-primary" />
      </div>
    );
  }

  const currentQuestion = questions[currentIndex];
  const isCorrect = selectedOption === currentQuestion?.correctAnswer;

  // ── Check answer ─────────────────────────────────────────────
  const handleCheck = () => {
    if (!selectedOption || status !== "selected") return;

    if (isCorrect) {
      setStatus("correct");
      const earned = currentQuestion.xpReward ?? 10;
      setSessionExp((prev) => prev + earned);
      addExp(earned);
    } else {
      setStatus("wrong");
      // Trigger shake
      setShake(true);
      setTimeout(() => setShake(false), 600);
      // Drain energy
      const newEnergy = Math.max(0, localEnergy - 1);
      setLocalEnergy(newEnergy);
      updateEnergy(newEnergy);
      if (newEnergy === 0) {
        setTimeout(() => setIsGameOver(true), 1200);
      }
    }
  };

  // ── Next question ─────────────────────────────────────────────
  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedOption(null);
      setStatus("idle");
    } else {
      // Lesson complete — save to Firestore
      markLessonComplete(lessonId);
      setIsComplete(true);
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.55 },
        colors: ["#00C2FF", "#FF4B4B", "#FFC800", "#00D16B"],
      });
    }
  };

  // ── Game Over screen ──────────────────────────────────────────
  if (isGameOver) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6 text-center gap-6">
        <div className="w-24 h-24 rounded-full bg-destructive/10 flex items-center justify-center">
          <Zap size={52} className="text-destructive" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Energi Habis!</h1>
          <p className="text-muted-foreground font-semibold max-w-xs mx-auto">
            Kamu kehabisan energi. Istirahat sejenak dan coba lagi nanti!
          </p>
        </div>
        <button
          onClick={() => setLocation("/")}
          className="w-full max-w-sm py-4 bg-primary text-white font-bold rounded-2xl text-lg shadow-[0_5px_0_0_hsl(195,100%,32%)] hover:shadow-[0_3px_0_0_hsl(195,100%,32%)] hover:translate-y-[2px] active:shadow-none active:translate-y-[4px] transition-all"
        >
          Kembali ke Menu
        </button>
      </div>
    );
  }

  // ── Complete screen ───────────────────────────────────────────
  if (isComplete) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6 text-center gap-6">
        <div className="w-28 h-28 rounded-full bg-warning/20 flex items-center justify-center">
          <Trophy size={60} className="text-warning fill-warning" />
        </div>
        <div>
          <h1 className="text-4xl font-bold text-correct mb-2">Pelajaran Selesai!</h1>
          <div className="flex items-center justify-center gap-2 text-2xl font-bold text-warning">
            <Zap size={28} className="fill-amber-400 text-amber-500" />
            +{sessionExp} EXP Diperoleh
          </div>
        </div>
        <button
          onClick={() => setLocation("/")}
          className="w-full max-w-sm py-4 bg-correct text-white font-bold rounded-2xl text-lg shadow-[0_5px_0_0_hsl(142,71%,30%)] hover:shadow-[0_3px_0_0_hsl(142,71%,30%)] hover:translate-y-[2px] active:shadow-none active:translate-y-[4px] transition-all"
        >
          Lanjutkan
        </button>
      </div>
    );
  }

  const checked = status === "correct" || status === "wrong";

  // ── Quiz screen ───────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-background flex flex-col max-w-3xl mx-auto w-full">

      {/* ── Top bar ── */}
      <div className="flex items-center gap-4 p-4 pt-5">
        <button
          onClick={() => setLocation("/")}
          className="p-2 text-muted-foreground hover:bg-muted rounded-full transition-colors"
        >
          <X size={24} />
        </button>
        <div className="flex-1">
          <ProgressBar value={currentIndex} max={questions.length} />
        </div>
        {/* Energy indicator */}
        <div className={`flex items-center gap-1.5 font-bold text-lg ${localEnergy === 0 ? "text-muted-foreground" : "text-amber-500"}`}>
          <Zap size={24} className={localEnergy > 0 ? "fill-amber-400 text-amber-500" : ""} />
          <span>{localEnergy}</span>
        </div>
      </div>

      {/* ── Question + Options ── */}
      <div className="flex-1 px-4 md:px-8 pb-4 flex flex-col">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ x: 60, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -60, opacity: 0 }}
            transition={{ type: "spring", stiffness: 280, damping: 28 }}
            className="flex-1 flex flex-col gap-6"
          >
            {/* Question */}
            <div className="pt-4">
              <p className="text-xs font-bold text-primary uppercase tracking-widest mb-2">
                Soal {currentIndex + 1} dari {questions.length}
              </p>
              <h2 className="text-2xl md:text-3xl font-bold text-foreground leading-snug">
                {currentQuestion?.question}
              </h2>
            </div>

            {/* Options */}
            <motion.div
              animate={shake ? { x: [-10, 10, -8, 8, -4, 4, 0] } : { x: 0 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="grid grid-cols-1 sm:grid-cols-2 gap-3"
            >
              {currentQuestion?.options?.map((option) => {
                let state: OptionState = "idle";
                if (checked) {
                  if (option === currentQuestion.correctAnswer) state = "correct";
                  else if (option === selectedOption) state = "wrong";
                  else state = "idle";
                } else if (option === selectedOption) {
                  state = "selected";
                }

                return (
                  <button
                    key={option}
                    disabled={checked}
                    onClick={() => {
                      if (checked) return;
                      setSelectedOption(option);
                      setStatus("selected");
                    }}
                    className={optionClass(state)}
                  >
                    {option}
                  </button>
                );
              })}
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* ── Bottom feedback + action bar ── */}
      <AnimatePresence>
        <motion.div
          key={checked ? "checked" : "unchecked"}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className={`border-t-2 p-4 md:p-6 transition-colors duration-300 ${
            status === "correct"
              ? "bg-correct/10 border-correct/30"
              : status === "wrong"
              ? "bg-destructive/10 border-destructive/30"
              : "bg-background border-border"
          }`}
        >
          {/* Feedback row */}
          {checked && (
            <div className="flex items-start gap-3 mb-4">
              <div
                className={`mt-0.5 p-1.5 rounded-full ${
                  status === "correct" ? "bg-correct text-white" : "bg-destructive text-white"
                }`}
              >
                {status === "correct" ? (
                  <CheckCircle2 size={28} />
                ) : (
                  <XCircle size={28} />
                )}
              </div>
              <div>
                <h3
                  className={`font-bold text-xl ${
                    status === "correct" ? "text-correct" : "text-destructive"
                  }`}
                >
                  {status === "correct" ? "Luar Biasa! 🎉" : "Kurang Tepat"}
                </h3>
                <p
                  className={`font-semibold text-sm mt-0.5 ${
                    status === "correct" ? "text-correct/80" : "text-destructive/80"
                  }`}
                >
                  {currentQuestion?.explanation}
                </p>
              </div>
            </div>
          )}

          {/* Action button */}
          <button
            disabled={status === "idle"}
            onClick={checked ? handleNext : handleCheck}
            className={`
              w-full py-4 rounded-2xl font-bold text-lg transition-all
              disabled:opacity-40 disabled:cursor-not-allowed disabled:shadow-none disabled:translate-y-0
              ${
                status === "correct"
                  ? "bg-correct text-white shadow-[0_5px_0_0_hsl(142,71%,30%)] hover:shadow-[0_3px_0_0_hsl(142,71%,30%)] hover:translate-y-[2px] active:shadow-none active:translate-y-[4px]"
                  : status === "wrong"
                  ? "bg-destructive text-white shadow-[0_5px_0_0_hsl(348,100%,44%)] hover:shadow-[0_3px_0_0_hsl(348,100%,44%)] hover:translate-y-[2px] active:shadow-none active:translate-y-[4px]"
                  : "bg-primary text-white shadow-[0_5px_0_0_hsl(195,100%,32%)] hover:shadow-[0_3px_0_0_hsl(195,100%,32%)] hover:translate-y-[2px] active:shadow-none active:translate-y-[4px]"
              }
            `}
          >
            {checked ? "Lanjutkan →" : "Periksa Jawaban"}
          </button>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
