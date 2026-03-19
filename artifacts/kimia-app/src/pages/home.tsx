import { AppLayout } from "@/components/layout";
import { useUserProfile } from "@/hooks/use-user-profile";
import { lessonIntroMap } from "@/lib/lesson-intro";
import { Star, Lock, Check, Flame } from "lucide-react";
import { useLocation } from "wouter";
import { motion } from "framer-motion";

const LESSONS = [
  { id: "l1", title: "Golongan 1", desc: "Logam Alkali" },
  { id: "l2", title: "Golongan 2", desc: "Alkali Tanah" },
  { id: "l3", title: "Golongan 18", desc: "Gas Mulia" },
  { id: "l4", title: "Golongan 17", desc: "Halogen" },
  { id: "l5", title: "Transisi", desc: "Logam Transisi" },
  { id: "l6", title: "Nonlogam", desc: "Unsur Nonlogam" },
  { id: "l7", title: "Metaloid", desc: "Sifat Ganda" },
  { id: "l8", title: "Ujian Akhir", desc: "Semua Unsur" },
];

export default function Home() {
  const { profile, loading } = useUserProfile();
  const [, setLocation] = useLocation();

  const completed: string[] = profile?.completedLessons ?? [];
  const streak = profile?.streak ?? 0;

  const nextLessonIndex = LESSONS.findIndex((l) => !completed.includes(l.id));
  const currentLessonIndex = nextLessonIndex === -1 ? LESSONS.length - 1 : nextLessonIndex;

  if (loading) {
    return (
      <AppLayout>
        <div className="flex-1 flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-4 border-primary" />
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <div className="py-6 px-4 flex flex-col items-center relative w-full overflow-hidden">

        {/* Gradient path line */}
        <div className="lesson-path-line" />

        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8 z-10"
        >
          <h1 className="text-3xl font-bold text-foreground">Jalur Kimia</h1>
          <p className="text-muted-foreground font-semibold mt-1">Kuasai Tabel Periodik!</p>

          {streak > 0 && (
            <div className="inline-flex items-center gap-1.5 mt-3 bg-warning/15 border border-warning/30 px-4 py-1.5 rounded-full">
              <Flame size={16} className="text-warning fill-warning" />
              <span className="text-warning font-bold text-sm">{streak} hari berturut-turut!</span>
            </div>
          )}
        </motion.div>

        {/* Lesson nodes */}
        <div className="flex flex-col gap-8 w-full max-w-sm pb-12 relative z-10">
          {LESSONS.map((lesson, index) => {
            const isCompleted = completed.includes(lesson.id);
            const isCurrent = index === currentLessonIndex;
            const isLocked = index > currentLessonIndex;
            const intro = lessonIntroMap[lesson.id];

            const alignment = index % 2 === 0 ? "self-start pl-8" : "self-end pr-8";

            return (
              <motion.div
                key={lesson.id}
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.06, type: "spring", stiffness: 240, damping: 22 }}
                className={`flex flex-col items-center ${alignment} relative`}
              >
                <div
                  className="relative group cursor-pointer"
                  onClick={() => !isLocked && setLocation(`/lesson/${lesson.id}`)}
                >
                  {/* "MULAI!" tooltip */}
                  {isCurrent && (
                    <motion.div
                      initial={{ opacity: 0, y: 4 }}
                      animate={{ opacity: 1, y: [0, -4, 0] }}
                      transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}
                      className="absolute -top-12 left-1/2 -translate-x-1/2 glass border border-primary/30 px-4 py-1.5 rounded-xl shadow-lg font-bold text-primary text-sm whitespace-nowrap z-20"
                    >
                      MULAI! 🚀
                      <div className="absolute -bottom-[7px] left-1/2 -translate-x-1/2 w-3 h-3 bg-white border-b border-r border-primary/20 rotate-45" />
                    </motion.div>
                  )}

                  {/* Node button */}
                  <button
                    disabled={isLocked}
                    className={`
                      w-20 h-20 rounded-full border-[5px] flex items-center justify-center shadow-lg transition-transform
                      ${!isLocked ? "hover:scale-110 active:scale-95" : "cursor-not-allowed"}
                      ${isCompleted ? "bg-correct border-correct shadow-[0_6px_0_0_hsl(145,63%,30%)]" : ""}
                      ${isCurrent ? "bg-primary border-primary shadow-[0_6px_0_0_hsl(199,100%,28%)] ring-8 ring-primary/20" : ""}
                      ${isLocked ? "bg-muted border-border shadow-[0_5px_0_0_hsl(214,28%,78%)] opacity-70" : ""}
                    `}
                  >
                    {isCompleted && <Check size={32} className="text-white stroke-[3]" />}
                    {isCurrent && <span className="text-2xl">{intro?.emoji ?? "⭐"}</span>}
                    {isLocked && <Lock size={26} className="text-muted-foreground" />}
                  </button>

                  {/* Label below node */}
                  <div className="mt-12 text-center absolute top-full left-1/2 -translate-x-1/2 w-32">
                    <h3 className="font-bold text-foreground text-sm">{lesson.title}</h3>
                    <p className="text-xs text-muted-foreground">{lesson.desc}</p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* All done banner */}
        {completed.length === LESSONS.length && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass border border-correct/30 rounded-3xl p-6 text-center max-w-sm w-full z-10 mb-8"
          >
            <div className="text-4xl mb-2">🏆</div>
            <h2 className="text-xl font-bold text-correct">Semua Pelajaran Selesai!</h2>
            <p className="text-muted-foreground text-sm mt-1">
              Kamu telah menguasai seluruh materi Chemigo. Luar biasa!
            </p>
          </motion.div>
        )}
      </div>
    </AppLayout>
  );
}
