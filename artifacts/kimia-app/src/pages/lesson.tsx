import { useState, useEffect, useRef } from "react";
import { useRoute, useLocation } from "wouter";
import { useQuestions } from "@/hooks/use-kimia-api";
import { useUserProfile } from "@/hooks/use-user-profile";
import { lessonIntroMap } from "@/lib/lesson-intro";
import {
  X, Zap, CheckCircle2, XCircle, Trophy,
  BookOpen, Lightbulb, ArrowRight, FlaskConical,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";

// ─────────────────────────────────────────────
// Progress Bar
// ─────────────────────────────────────────────
function ProgressBar({ value, max }: { value: number; max: number }) {
  const pct = max > 0 ? Math.round((value / max) * 100) : 0;
  return (
    <div className="h-3.5 bg-muted rounded-full overflow-hidden border border-border/50">
      <motion.div
        className="h-full bg-gradient-to-r from-primary to-cyan-400 rounded-full"
        initial={{ width: 0 }}
        animate={{ width: `${pct}%` }}
        transition={{ type: "spring", stiffness: 180, damping: 26 }}
      />
    </div>
  );
}

// ─────────────────────────────────────────────
// Energy dots
// ─────────────────────────────────────────────
function EnergyDots({ count }: { count: number }) {
  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: 5 }).map((_, i) => (
        <motion.div
          key={i}
          animate={{ scale: i === count ? [1, 1.3, 1] : 1 }}
          transition={{ duration: 0.3 }}
          className={`w-3 h-3 rounded-full border-2 ${
            i < count
              ? "bg-amber-400 border-amber-500"
              : "bg-muted border-border"
          }`}
        />
      ))}
    </div>
  );
}

// ─────────────────────────────────────────────
// Option button state classes
// ─────────────────────────────────────────────
type OptionState = "idle" | "selected" | "correct" | "wrong";

function optionClass(state: OptionState) {
  const base =
    "w-full p-4 md:p-5 rounded-2xl border-2 text-base md:text-lg font-bold transition-all duration-200 text-left select-none";
  switch (state) {
    case "selected":
      return `${base} glass bg-primary/15 border-primary text-primary shadow-[0_4px_0_0_hsl(195,100%,36%)]`;
    case "correct":
      return `${base} bg-correct/90 border-correct text-white shadow-[0_4px_0_0_hsl(142,71%,28%)]`;
    case "wrong":
      return `${base} bg-destructive/90 border-destructive text-white shadow-[0_3px_0_0_hsl(348,100%,40%)]`;
    default:
      return `${base} glass border-border/60 text-foreground hover:border-primary/40 hover:bg-primary/5 shadow-[0_4px_0_0_hsl(214,32%,78%)] btn-push`;
  }
}

// ─────────────────────────────────────────────
// Theory Flashcard Screen
// ─────────────────────────────────────────────
function TheoryCard({
  lessonId,
  onContinue,
}: {
  lessonId: string;
  onContinue: () => void;
}) {
  const intro = lessonIntroMap[lessonId];

  if (!intro) {
    onContinue();
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 via-background to-secondary/10 flex flex-col items-center justify-center p-5">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 200, damping: 24 }}
        className="w-full max-w-md flex flex-col gap-5"
      >
        {/* Header badge */}
        <div className="flex justify-center">
          <span className="glass border border-primary/30 text-primary text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-widest flex items-center gap-1.5">
            <BookOpen size={12} /> Materi Pelajaran
          </span>
        </div>

        {/* Emoji + title */}
        <div className="text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 260, damping: 18, delay: 0.1 }}
            className="text-7xl mb-3"
          >
            {intro.emoji}
          </motion.div>
          <h1 className="text-3xl font-bold text-foreground">{intro.title}</h1>
          <p className="text-primary font-semibold mt-1">{intro.subtitle}</p>
        </div>

        {/* Theory card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glass border border-border/60 rounded-3xl p-5 shadow-lg"
        >
          <div className="flex items-center gap-2 text-primary font-bold text-sm mb-3">
            <FlaskConical size={16} />
            Teori Singkat
          </div>
          <p className="text-foreground leading-relaxed text-sm md:text-base">
            {intro.theory}
          </p>
        </motion.div>

        {/* Fun fact card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-gradient-to-br from-warning/20 to-amber-100/60 border-2 border-warning/40 rounded-3xl p-5 shadow-sm"
        >
          <div className="flex items-center gap-2 text-warning font-bold text-sm mb-2">
            <Lightbulb size={16} className="fill-warning" />
            Fakta Menarik {intro.funFactIcon}
          </div>
          <p className="text-foreground/90 text-sm font-semibold leading-relaxed">
            {intro.funFact}
          </p>
        </motion.div>

        {/* CTA button */}
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          onClick={onContinue}
          className="w-full py-4 bg-primary text-white font-bold text-lg rounded-2xl shadow-[0_5px_0_0_hsl(195,100%,30%)] hover:shadow-[0_3px_0_0_hsl(195,100%,30%)] hover:translate-y-[2px] active:shadow-none active:translate-y-[4px] transition-all flex items-center justify-center gap-2"
        >
          Mulai Kuis! <ArrowRight size={20} />
        </motion.button>
      </motion.div>
    </div>
  );
}

// ─────────────────────────────────────────────
// Wrong-answer Explanation Bottom Sheet
// ─────────────────────────────────────────────
function WrongAnswerSheet({
  explanation,
  correctAnswer,
  onContinue,
}: {
  explanation: string;
  correctAnswer: string;
  onContinue: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 z-50 flex flex-col justify-end"
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/30 backdrop-blur-[2px]" />

      {/* Sheet */}
      <motion.div
        initial={{ y: "100%" }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 320, damping: 30 }}
        className="relative z-10 bg-card rounded-t-3xl border-t-2 border-destructive/30 shadow-2xl p-6 pb-10 max-w-2xl w-full mx-auto"
      >
        {/* Red strip at top */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-destructive to-rose-400 rounded-t-3xl" />

        {/* Icon + heading */}
        <div className="flex items-center gap-3 mb-4 mt-1">
          <div className="w-12 h-12 rounded-full bg-destructive/15 flex items-center justify-center flex-shrink-0">
            <XCircle size={26} className="text-destructive" />
          </div>
          <div>
            <h3 className="font-bold text-xl text-destructive">Kurang Tepat!</h3>
            <p className="text-muted-foreground text-sm font-semibold">
              Jawaban benar:{" "}
              <span className="text-correct font-bold">{correctAnswer}</span>
            </p>
          </div>
        </div>

        {/* Explanation box */}
        <div className="bg-destructive/5 border border-destructive/20 rounded-2xl p-4 mb-5">
          <p className="text-xs font-bold text-destructive uppercase tracking-widest mb-1.5">
            💡 Penjelasan
          </p>
          <p className="text-foreground font-semibold text-sm leading-relaxed">
            {explanation || "Pelajari materi ini lagi untuk jawaban yang lebih baik!"}
          </p>
        </div>

        {/* Continue button */}
        <button
          onClick={onContinue}
          className="w-full py-4 bg-destructive text-white font-bold text-lg rounded-2xl shadow-[0_5px_0_0_hsl(348,100%,40%)] hover:shadow-[0_3px_0_0_hsl(348,100%,40%)] hover:translate-y-[2px] active:shadow-none active:translate-y-[4px] transition-all"
        >
          Mengerti, Lanjutkan →
        </button>
      </motion.div>
    </motion.div>
  );
}

// ─────────────────────────────────────────────
// Correct-answer Bottom Bar
// ─────────────────────────────────────────────
function CorrectBar({ onNext }: { onNext: () => void }) {
  return (
    <motion.div
      initial={{ y: 40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="bg-correct/10 border-t-2 border-correct/30 p-4 md:p-6"
    >
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-full bg-correct flex items-center justify-center flex-shrink-0">
          <CheckCircle2 size={22} className="text-white" />
        </div>
        <div>
          <h3 className="font-bold text-lg text-correct">Luar Biasa! 🎉</h3>
          <p className="text-correct/70 text-xs font-semibold">Jawaban kamu benar!</p>
        </div>
      </div>
      <button
        onClick={onNext}
        className="w-full py-4 bg-correct text-white font-bold text-lg rounded-2xl shadow-[0_5px_0_0_hsl(142,71%,28%)] hover:shadow-[0_3px_0_0_hsl(142,71%,28%)] hover:translate-y-[2px] active:shadow-none active:translate-y-[4px] transition-all"
      >
        Lanjutkan →
      </button>
    </motion.div>
  );
}

// ─────────────────────────────────────────────
// Main Lesson Component
// ─────────────────────────────────────────────
type Phase = "intro" | "quiz";

export default function Lesson() {
  const [, params] = useRoute("/lesson/:id");
  const [, setLocation] = useLocation();
  const lessonId = params?.id ?? "l1";

  const { data: questions, isLoading: qLoading } = useQuestions({ lessonId });
  const { profile, updateEnergy, addExp, markLessonComplete } = useUserProfile();

  const [phase, setPhase] = useState<Phase>("intro");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [status, setStatus] = useState<"idle" | "selected" | "correct" | "wrong">("idle");
  const [sessionExp, setSessionExp] = useState(0);
  const [isGameOver, setIsGameOver] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [shake, setShake] = useState(false);
  const [showWrongSheet, setShowWrongSheet] = useState(false);

  const [localEnergy, setLocalEnergy] = useState<number>(5);
  const energySynced = useRef(false);

  useEffect(() => {
    if (profile && !energySynced.current) {
      setLocalEnergy(profile.energy);
      energySynced.current = true;
    }
  }, [profile]);

  // ── Loading ──────────────────────────────────
  if (qLoading || !questions) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-background gap-4">
        <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center animate-pulse">
          <FlaskConical size={30} className="text-primary" />
        </div>
        <p className="text-muted-foreground font-semibold animate-pulse">Memuat pelajaran...</p>
      </div>
    );
  }

  // ── Theory intro phase ───────────────────────
  if (phase === "intro") {
    return <TheoryCard lessonId={lessonId} onContinue={() => setPhase("quiz")} />;
  }

  const currentQuestion = questions[currentIndex];
  const isCorrect = selectedOption === currentQuestion?.correctAnswer;
  const checked = status === "correct" || status === "wrong";

  // ── Check answer ─────────────────────────────
  const handleCheck = () => {
    if (!selectedOption || status !== "selected") return;

    if (isCorrect) {
      setStatus("correct");
      const earned = currentQuestion.xpReward ?? 10;
      setSessionExp((prev) => prev + earned);
      addExp(earned);
    } else {
      setStatus("wrong");
      setShake(true);
      setTimeout(() => setShake(false), 600);
      setTimeout(() => setShowWrongSheet(true), 350);
      const newEnergy = Math.max(0, localEnergy - 1);
      setLocalEnergy(newEnergy);
      updateEnergy(newEnergy);
      if (newEnergy === 0) {
        setTimeout(() => setIsGameOver(true), 2000);
      }
    }
  };

  // ── Advance to next question ─────────────────
  const handleNext = () => {
    setShowWrongSheet(false);
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedOption(null);
      setStatus("idle");
    } else {
      markLessonComplete(lessonId);
      setIsComplete(true);
      confetti({
        particleCount: 140,
        spread: 90,
        origin: { y: 0.5 },
        colors: ["#00C2FF", "#FF4B4B", "#FFC800", "#00D16B", "#a855f7"],
      });
    }
  };

  // ── Game Over ────────────────────────────────
  if (isGameOver) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-destructive/5 via-background to-background flex flex-col items-center justify-center p-6 text-center gap-6">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 16 }}
          className="w-28 h-28 rounded-full bg-destructive/10 border-4 border-destructive/20 flex items-center justify-center"
        >
          <Zap size={56} className="text-destructive" />
        </motion.div>
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Energi Habis!</h1>
          <p className="text-muted-foreground font-semibold max-w-xs mx-auto leading-relaxed">
            Kamu kehabisan energi. Istirahat sejenak dan coba lagi nanti — kamu pasti bisa!
          </p>
        </div>
        <button
          onClick={() => setLocation("/")}
          className="w-full max-w-sm py-4 bg-primary text-white font-bold rounded-2xl text-lg shadow-[0_5px_0_0_hsl(195,100%,30%)] hover:shadow-[0_3px_0_0_hsl(195,100%,30%)] hover:translate-y-[2px] active:shadow-none active:translate-y-[4px] transition-all"
        >
          Kembali ke Menu
        </button>
      </div>
    );
  }

  // ── Lesson Complete ──────────────────────────
  if (isComplete) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-correct/10 via-background to-primary/5 flex flex-col items-center justify-center p-6 text-center gap-6">
        <motion.div
          initial={{ scale: 0, rotate: -20 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 200, damping: 14 }}
          className="w-32 h-32 rounded-full bg-warning/20 border-4 border-warning/30 flex items-center justify-center"
        >
          <Trophy size={64} className="text-warning fill-warning" />
        </motion.div>
        <div>
          <h1 className="text-4xl font-bold text-correct mb-1">Luar Biasa!</h1>
          <p className="text-xl font-bold text-foreground mb-1">Pelajaran Selesai 🎉</p>
          <div className="flex items-center justify-center gap-2 text-2xl font-bold text-amber-500 mt-3">
            <Zap size={26} className="fill-amber-400" />
            +{sessionExp} EXP Diperoleh
          </div>
        </div>
        <button
          onClick={() => setLocation("/")}
          className="w-full max-w-sm py-4 bg-correct text-white font-bold rounded-2xl text-lg shadow-[0_5px_0_0_hsl(142,71%,28%)] hover:shadow-[0_3px_0_0_hsl(142,71%,28%)] hover:translate-y-[2px] active:shadow-none active:translate-y-[4px] transition-all"
        >
          Lanjutkan ke Menu
        </button>
      </div>
    );
  }

  // ── Quiz Screen ──────────────────────────────
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-primary/5 flex flex-col max-w-3xl mx-auto w-full relative">

      {/* Wrong-answer explanation sheet (portal-style overlay) */}
      <AnimatePresence>
        {showWrongSheet && (
          <WrongAnswerSheet
            explanation={currentQuestion?.explanation ?? ""}
            correctAnswer={currentQuestion?.correctAnswer ?? ""}
            onContinue={handleNext}
          />
        )}
      </AnimatePresence>

      {/* ── Top bar ── */}
      <div className="flex items-center gap-3 px-4 py-4">
        <button
          onClick={() => setLocation("/")}
          className="p-2 text-muted-foreground hover:bg-muted/80 rounded-full transition-colors flex-shrink-0"
        >
          <X size={22} />
        </button>
        <div className="flex-1">
          <ProgressBar value={currentIndex} max={questions.length} />
        </div>
        <div className="flex-shrink-0">
          <EnergyDots count={localEnergy} />
        </div>
      </div>

      {/* ── Question + options ── */}
      <div className="flex-1 px-4 md:px-8 pb-4 flex flex-col">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ x: 60, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -60, opacity: 0 }}
            transition={{ type: "spring", stiffness: 280, damping: 28 }}
            className="flex-1 flex flex-col gap-5"
          >
            {/* Question header */}
            <div className="pt-2">
              <p className="text-xs font-bold text-primary/70 uppercase tracking-widest mb-2">
                Soal {currentIndex + 1} / {questions.length}
              </p>
              <div className="glass border border-border/50 rounded-2xl p-5 shadow-sm">
                <h2 className="text-xl md:text-2xl font-bold text-foreground leading-snug">
                  {currentQuestion?.question}
                </h2>
              </div>
            </div>

            {/* Options */}
            <motion.div
              animate={shake ? { x: [-12, 12, -8, 8, -4, 4, 0] } : { x: 0 }}
              transition={{ duration: 0.5 }}
              className="grid grid-cols-1 sm:grid-cols-2 gap-3"
            >
              {currentQuestion?.options?.map((option) => {
                let state: OptionState = "idle";
                if (checked) {
                  if (option === currentQuestion.correctAnswer) state = "correct";
                  else if (option === selectedOption) state = "wrong";
                } else if (option === selectedOption) {
                  state = "selected";
                }

                return (
                  <motion.button
                    key={option}
                    disabled={checked}
                    whileTap={{ scale: checked ? 1 : 0.97 }}
                    onClick={() => {
                      if (checked) return;
                      setSelectedOption(option);
                      setStatus("selected");
                    }}
                    className={optionClass(state)}
                  >
                    {option}
                  </motion.button>
                );
              })}
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* ── Bottom action area ── */}
      <AnimatePresence mode="wait">
        {status === "correct" ? (
          <CorrectBar key="correct" onNext={handleNext} />
        ) : (
          <motion.div
            key="idle"
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="bg-background/80 backdrop-blur-md border-t border-border/50 p-4 md:p-6"
          >
            <button
              disabled={status === "idle"}
              onClick={handleCheck}
              className="w-full py-4 rounded-2xl font-bold text-lg transition-all
                disabled:opacity-35 disabled:cursor-not-allowed disabled:shadow-none disabled:translate-y-0
                bg-primary text-white shadow-[0_5px_0_0_hsl(195,100%,30%)]
                hover:shadow-[0_3px_0_0_hsl(195,100%,30%)] hover:translate-y-[2px]
                active:shadow-none active:translate-y-[4px]"
            >
              Periksa Jawaban
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
