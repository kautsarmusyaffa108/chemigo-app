import { AppLayout } from "@/components/layout";
import { useLeaderboard } from "@/hooks/use-kimia-api";
import { getSessionId } from "@/lib/session";
import { Shield, Medal, Trophy, Award } from "lucide-react";

export default function LeaderboardPage() {
  const { data: leaderboard, isLoading } = useLeaderboard();
  const currentSessionId = getSessionId();

  return (
    <AppLayout>
      <div className="p-4 md:p-6 w-full max-w-lg mx-auto flex flex-col pb-24">
        
        <div className="flex flex-col items-center justify-center py-6 border-b-2 border-border/50 mb-6">
          <div className="w-20 h-20 bg-warning/20 rounded-full flex items-center justify-center mb-3">
            <Trophy size={40} className="text-warning fill-warning" />
          </div>
          <h1 className="text-3xl font-display font-bold text-foreground">Papan Peringkat</h1>
          <p className="text-muted-foreground font-semibold">Bersaing dengan pelajar lain!</p>
        </div>

        {isLoading ? (
          <div className="flex justify-center p-8">
             <div className="animate-spin rounded-full h-10 w-10 border-b-4 border-primary"></div>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {leaderboard?.map((entry) => {
              const isMe = entry.sessionId === currentSessionId;
              
              let RankIcon = null;
              if (entry.rank === 1) RankIcon = <Medal size={24} className="text-yellow-500 fill-yellow-500" />;
              else if (entry.rank === 2) RankIcon = <Medal size={24} className="text-gray-400 fill-gray-400" />;
              else if (entry.rank === 3) RankIcon = <Medal size={24} className="text-amber-700 fill-amber-700" />;
              else RankIcon = <span className="font-bold text-muted-foreground w-6 text-center">{entry.rank}</span>;

              return (
                <div 
                  key={entry.sessionId}
                  className={`
                    flex items-center gap-4 p-4 rounded-2xl border-2 transition-all
                    ${isMe ? "bg-primary/10 border-primary shadow-[0_4px_0_0_hsl(195,100%,45%)]" : "bg-card border-border shadow-sm"}
                  `}
                >
                  <div className="w-8 flex justify-center">
                    {RankIcon}
                  </div>
                  
                  <div className="w-12 h-12 rounded-full bg-secondary text-white flex items-center justify-center font-bold text-lg border-2 border-secondary-foreground/20">
                    {entry.sessionId.substring(0, 2).toUpperCase()}
                  </div>

                  <div className="flex-1">
                    <h3 className="font-bold text-foreground text-lg">
                      {isMe ? "Kamu" : `Pelajar ${entry.sessionId.substring(0, 4)}`}
                    </h3>
                    <p className="text-xs text-muted-foreground font-semibold">
                      {entry.completedLessonsCount} Pelajaran selesai
                    </p>
                  </div>

                  <div className="flex items-center gap-1.5 font-bold text-primary bg-primary/10 px-3 py-1.5 rounded-xl">
                    <Shield size={18} className="fill-primary" />
                    {entry.xp}
                  </div>
                </div>
              );
            })}
          </div>
        )}

      </div>
    </AppLayout>
  );
}
