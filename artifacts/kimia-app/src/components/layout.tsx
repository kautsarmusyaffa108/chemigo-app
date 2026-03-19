import { ReactNode } from "react";
import { Link, useLocation } from "wouter";
import { useAuth } from "@/contexts/AuthContext";
import { useUserProfile } from "@/hooks/use-user-profile";
import { Zap, Flame, Shield, Map, Grid, Trophy, User, Atom } from "lucide-react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function TopBar() {
  const { user } = useAuth();
  const { profile } = useUserProfile();

  const energy = profile?.energy ?? 5;
  const exp = profile?.exp ?? 0;
  const streak = profile?.streak ?? 0;

  return (
    <div className="sticky top-0 z-40 bg-background/80 backdrop-blur-md border-b border-border px-4 py-3 flex items-center justify-between shadow-sm">
      {/* Logo */}
      <div className="flex items-center gap-2 text-primary font-bold text-xl">
        <div className="bg-primary text-white p-1.5 rounded-lg rotate-3 shadow-sm">
          <Atom size={20} className="-rotate-3" />
        </div>
        Chemigo
      </div>

      {/* Stats */}
      <div className="flex items-center gap-3 sm:gap-5 font-bold text-base">
        {/* Streak */}
        <div className="flex items-center gap-1 text-warning">
          <Flame size={20} className="fill-warning text-warning" />
          <span>{streak}</span>
        </div>

        {/* EXP */}
        <div className="flex items-center gap-1 text-primary">
          <Shield size={20} className="fill-primary text-primary" />
          <span>{exp}</span>
        </div>

        {/* Energy (replaces Hearts) */}
        <div className={cn(
          "flex items-center gap-1",
          energy === 0 ? "text-muted-foreground" : "text-amber-500"
        )}>
          <Zap
            size={20}
            className={energy > 0 ? "fill-amber-400 text-amber-500" : "text-muted-foreground"}
          />
          <span>{energy}</span>
        </div>

        {/* Profile Avatar */}
        <Link href="/profile">
          <button className="w-9 h-9 rounded-full border-2 border-primary/30 overflow-hidden hover:border-primary transition-colors flex-shrink-0 shadow-sm hover:shadow-md">
            {user?.photoURL ? (
              <img src={user.photoURL} alt="Profil" className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full bg-primary/10 flex items-center justify-center">
                <User size={18} className="text-primary" />
              </div>
            )}
          </button>
        </Link>
      </div>
    </div>
  );
}

export function BottomNav() {
  const [location] = useLocation();

  const navItems = [
    { href: "/", icon: Map, label: "Belajar" },
    { href: "/periodic-table", icon: Grid, label: "Tabel" },
    { href: "/leaderboard", icon: Trophy, label: "Peringkat" },
    { href: "/profile", icon: User, label: "Profil" },
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
                "flex flex-col items-center gap-1 p-2 rounded-xl transition-all duration-200 min-w-[64px]",
                isActive ? "text-primary bg-primary/10" : "text-muted-foreground hover:bg-muted"
              )}
            >
              <item.icon size={22} className={isActive ? "fill-primary/20" : ""} />
              <span className="text-[10px] font-bold">{item.label}</span>
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
