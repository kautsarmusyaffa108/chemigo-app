import { ReactNode } from "react";
import { Link, useLocation } from "wouter";
import { useProgress } from "@/hooks/use-kimia-api";
import { Heart, Flame, Shield, Map, Grid, Trophy } from "lucide-react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function TopBar() {
  const { data: progress } = useProgress();
  const hearts = progress?.hearts ?? 5;
  const xp = progress?.xp ?? 0;
  const streak = progress?.streak ?? 0;

  return (
    <div className="sticky top-0 z-40 bg-background/80 backdrop-blur-md border-b border-border px-4 py-3 flex items-center justify-between shadow-sm">
      <div className="flex items-center gap-2 text-primary font-display font-bold text-xl">
        <div className="bg-primary text-white p-1.5 rounded-lg rotate-3 shadow-sm">
          <Map size={20} className="-rotate-3" />
        </div>
        Chemigo
      </div>
      
      <div className="flex items-center gap-4 sm:gap-6 font-bold text-lg">
        <div className="flex items-center gap-1.5 text-warning">
          <Flame size={22} className="fill-warning text-warning" />
          <span>{streak}</span>
        </div>
        
        <div className="flex items-center gap-1.5 text-primary">
          <Shield size={22} className="fill-primary text-primary" />
          <span>{xp}</span>
        </div>

        <div className={cn("flex items-center gap-1.5", hearts === 0 ? "text-muted-foreground" : "text-destructive")}>
          <Heart size={22} className={hearts > 0 ? "fill-destructive text-destructive" : ""} />
          <span>{hearts}</span>
        </div>
      </div>
    </div>
  );
}

export function BottomNav() {
  const [location] = useLocation();

  const navItems = [
    { href: "/", icon: Map, label: "Learn" },
    { href: "/periodic-table", icon: Grid, label: "Table" },
    { href: "/leaderboard", icon: Trophy, label: "Ranks" },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-background border-t border-border pb-safe">
      <div className="max-w-md mx-auto flex items-center justify-around p-2">
        {navItems.map((item) => {
          const isActive = location === item.href;
          return (
            <Link 
              key={item.href} 
              href={item.href}
              className={cn(
                "flex flex-col items-center gap-1 p-2 rounded-xl transition-all duration-200 min-w-[72px]",
                isActive ? "text-primary bg-primary/10" : "text-muted-foreground hover:bg-muted"
              )}
            >
              <item.icon size={24} className={isActive ? "fill-primary/20" : ""} />
              <span className="text-xs font-bold">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export function AppLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col bg-background pb-20">
      <TopBar />
      <main className="flex-1 w-full max-w-2xl mx-auto flex flex-col">
        {children}
      </main>
      <BottomNav />
    </div>
  );
}
