import { useState, useEffect } from "react";
import { useRoute, useLocation } from "wouter";
import { useQuestions, useProgress, useSaveProgress } from "@/hooks/use-kimia-api";
import { PlayButton, ProgressBar } from "@/components/ui-elements";
import { X, Heart, CheckCircle2, XCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";

export default function Lesson() {
  const [, params] = useRoute("/lesson/:id");
  const [, setLocation] = useLocation();
  const lessonId = params?.id || "l1";

  const { data: questions, isLoading: qLoading } = useQuestions({ lessonId });
  const { data: progress, isLoading: pLoading } = useProgress();
  const saveProgress = useSaveProgress();

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [status, setStatus] = useState<"idle" | "selected" | "checked">("idle");
  const [sessionXP, setSessionXP] = useState(0);
  const [isGameOver, setIsGameOver] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  // Local hearts state to show immediate feedback before mutation completes
  const [localHearts, setLocalHearts] = useState(5);

  useEffect(() => {
    if (progress && localHearts === 5) { // initialized
      setLocalHearts(progress.hearts);
    }
  }, [progress]);

  if (qLoading || pLoading || !questions || !progress) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-spin rounded-full h-12 w-12 border-b-4 border-primary"></div>
      </div>
    );
  }

  const currentQuestion = questions[currentIndex];
  const isCorrect = selectedOption === currentQuestion?.correctAnswer;

  const handleCheck = () => {
    if (!selectedOption) return;
    
    setStatus("checked");
    
    if (isCorrect) {
      setSessionXP(prev => prev + currentQuestion.xpReward);
      // Play correct sound (mock)
    } else {
      // Play wrong sound (mock)
      const newHearts = Math.max(0, localHearts - 1);
      setLocalHearts(newHearts);
      saveProgress.mutate({ hearts: newHearts });
      
      if (newHearts === 0) {
        setTimeout(() => setIsGameOver(true), 1000);
      }
    }
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setSelectedOption(null);
      setStatus("idle");
    } else {
      // Finish lesson
      setIsComplete(true);
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#00C2FF', '#FF4B4B', '#FFC800', '#00D16B']
      });
      
      const newCompleted = [...new Set([...progress.completedLessons, lessonId])];
      saveProgress.mutate({
        xp: progress.xp + sessionXP,
        completedLessons: newCompleted,
      });
    }
  };

  const quitLesson = () => setLocation("/");

  if (isGameOver) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6 text-center">
        <Heart size={80} className="text-muted stroke-muted-foreground mb-6" />
        <h1 className="text-3xl font-display font-bold text-foreground mb-4">Nyawa Habis!</h1>
        <p className="text-muted-foreground mb-8">Kamu kehilangan semua nyawa. Istirahat sejenak dan coba lagi nanti.</p>
        <PlayButton className="w-full max-w-sm" onClick={quitLesson}>
          Kembali ke Menu
        </PlayButton>
      </div>
    );
  }

  if (isComplete) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6 text-center">
        <div className="mb-8 relative">
          <img src={`${import.meta.env.BASE_URL}images/mascot-happy.png`} alt="Happy Mascot" className="w-48 h-48 object-contain drop-shadow-xl" />
        </div>
        <h1 className="text-4xl font-display font-bold text-correct mb-2">Pelajaran Selesai!</h1>
        <p className="text-xl font-bold text-warning mb-8">+{sessionXP} XP Diperoleh</p>
        
        <PlayButton variant="correct" size="lg" className="w-full max-w-sm" onClick={quitLesson}>
          Lanjutkan
        </PlayButton>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col max-w-3xl mx-auto w-full">
      {/* Top Bar */}
      <div className="flex items-center gap-4 p-4">
        <button onClick={quitLesson} className="p-2 text-muted-foreground hover:bg-muted rounded-full transition-colors">
          <X size={24} />
        </button>
        <div className="flex-1">
          <ProgressBar value={currentIndex} max={questions.length} />
        </div>
        <div className="flex items-center gap-1.5 font-bold text-destructive text-lg">
          <Heart size={24} className={localHearts > 0 ? "fill-destructive" : ""} />
          <span>{localHearts}</span>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-4 md:p-8 flex flex-col">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -50, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="flex-1 flex flex-col"
          >
            <h2 className="text-2xl md:text-3xl font-display font-bold text-foreground mb-8">
              {currentQuestion?.question}
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-auto mb-auto">
              {currentQuestion?.options?.map((option) => {
                const isSelected = selectedOption === option;
                let btnVariant: "default" | "outline" | "correct" | "danger" = "outline";
                
                if (status === "checked") {
                  if (option === currentQuestion.correctAnswer) btnVariant = "correct";
                  else if (isSelected) btnVariant = "danger";
                } else if (isSelected) {
                  btnVariant = "default";
                }

                return (
                  <motion.button
                    key={option}
                    disabled={status === "checked"}
                    onClick={() => {
                      setSelectedOption(option);
                      setStatus("selected");
                    }}
                    whileTap={{ scale: status === "checked" ? 1 : 0.95 }}
                    className={`
                      p-4 md:p-6 rounded-2xl border-2 text-lg font-bold transition-all text-left relative overflow-hidden
                      ${btnVariant === 'outline' ? 'bg-background border-border text-foreground hover:bg-muted shadow-[0_4px_0_0_hsl(214,32%,80%)]' : ''}
                      ${btnVariant === 'default' ? 'bg-primary/10 border-primary text-primary shadow-[0_4px_0_0_hsl(195,100%,45%)]' : ''}
                      ${btnVariant === 'correct' ? 'bg-correct border-correct text-white shadow-[0_4px_0_0_hsl(142,71%,35%)]' : ''}
                      ${btnVariant === 'danger' ? 'bg-destructive border-destructive text-white shadow-[0_4px_0_0_hsl(348,100%,51%)]' : ''}
                      btn-push
                    `}
                  >
                    {option}
                  </motion.button>
                );
              })}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Bottom Bar */}
      <div className={`
        border-t-2 p-4 md:p-6 transition-colors duration-300
        ${status === "checked" && isCorrect ? "bg-correct/10 border-correct/20" : ""}
        ${status === "checked" && !isCorrect ? "bg-destructive/10 border-destructive/20" : "bg-background border-border"}
      `}>
        {status === "checked" && (
          <div className="mb-4 flex items-start gap-4">
            <div className={`p-2 rounded-full ${isCorrect ? "bg-correct text-white" : "bg-destructive text-white"}`}>
              {isCorrect ? <CheckCircle2 size={32} /> : <XCircle size={32} />}
            </div>
            <div>
              <h3 className={`font-display font-bold text-xl ${isCorrect ? "text-correct" : "text-destructive"}`}>
                {isCorrect ? "Jawaban Benar!" : "Jawaban Salah"}
              </h3>
              <p className={`font-semibold mt-1 ${isCorrect ? "text-correct/80" : "text-destructive/80"}`}>
                {currentQuestion?.explanation}
              </p>
            </div>
          </div>
        )}

        <PlayButton 
          variant={status === "checked" ? (isCorrect ? "correct" : "danger") : "default"}
          size="lg" 
          className="w-full"
          disabled={status === "idle"}
          onClick={status === "checked" ? handleNext : handleCheck}
        >
          {status === "checked" ? "Lanjutkan" : "Periksa"}
        </PlayButton>
      </div>
    </div>
  );
}
