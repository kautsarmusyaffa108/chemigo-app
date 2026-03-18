import { AppLayout } from "@/components/layout";
import { useProgress } from "@/hooks/use-kimia-api";
import { PlayButton } from "@/components/ui-elements";
import { Star, Lock, Check } from "lucide-react";
import { useLocation } from "wouter";

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
  const { data: progress, isLoading } = useProgress();
  const [, setLocation] = useLocation();

  if (isLoading) {
    return (
      <AppLayout>
        <div className="flex-1 flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-4 border-primary"></div>
        </div>
      </AppLayout>
    );
  }

  const completed = progress?.completedLessons || [];
  
  // Find the first uncompleted lesson
  const nextLessonIndex = LESSONS.findIndex(l => !completed.includes(l.id));
  const currentLessonIndex = nextLessonIndex === -1 ? LESSONS.length - 1 : nextLessonIndex;

  return (
    <AppLayout>
      <div className="py-8 px-4 flex flex-col items-center relative w-full overflow-hidden">
        
        {/* Background decorative path */}
        <div className="absolute top-0 bottom-0 left-1/2 w-4 bg-muted -translate-x-1/2 -z-10 rounded-full opacity-50" />

        <div className="text-center mb-8">
          <h1 className="text-3xl font-display font-bold text-foreground">Jalur Kimia</h1>
          <p className="text-muted-foreground font-semibold">Kuasai Tabel Periodik!</p>
        </div>

        <div className="flex flex-col gap-8 w-full max-w-sm pb-12 relative z-0">
          {LESSONS.map((lesson, index) => {
            const isCompleted = completed.includes(lesson.id);
            const isCurrent = index === currentLessonIndex;
            const isLocked = index > currentLessonIndex;
            
            // Zig zag layout
            const alignment = index % 2 === 0 ? "self-start pl-8" : "self-end pr-8";
            
            return (
              <div key={lesson.id} className={`flex flex-col items-center ${alignment} relative`}>
                
                {/* Connecting line to next (mocked with pseudo elements if needed, but absolute background line works well enough) */}

                <div className="relative group cursor-pointer" onClick={() => !isLocked && setLocation(`/lesson/${lesson.id}`)}>
                  
                  {isCurrent && (
                    <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-white px-4 py-2 rounded-xl shadow-lg border-2 border-border font-bold text-primary animate-bounce whitespace-nowrap z-10">
                      MULAI!
                      <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-white border-b-2 border-r-2 border-border rotate-45" />
                    </div>
                  )}

                  <button 
                    disabled={isLocked}
                    className={`
                      w-20 h-20 rounded-full border-[6px] flex items-center justify-center shadow-lg transition-transform hover:scale-105 active:scale-95
                      ${isCompleted ? "bg-correct border-correct shadow-[0_6px_0_0_hsl(142,71%,35%)]" : ""}
                      ${isCurrent ? "bg-primary border-primary shadow-[0_6px_0_0_hsl(195,100%,35%)] ring-8 ring-primary/20" : ""}
                      ${isLocked ? "bg-muted border-border shadow-[0_6px_0_0_hsl(214,32%,80%)] cursor-not-allowed opacity-80" : ""}
                    `}
                  >
                    {isCompleted && <Check size={32} className="text-white stroke-[3]" />}
                    {isCurrent && <Star size={32} className="text-white fill-white" />}
                    {isLocked && <Lock size={28} className="text-muted-foreground" />}
                  </button>
                  
                  {/* Lesson label */}
                  <div className="mt-4 text-center absolute top-full left-1/2 -translate-x-1/2 w-32">
                    <h3 className="font-bold text-foreground text-sm">{lesson.title}</h3>
                    <p className="text-xs text-muted-foreground">{lesson.desc}</p>
                  </div>
                </div>

              </div>
            );
          })}
        </div>
      </div>
    </AppLayout>
  );
}
