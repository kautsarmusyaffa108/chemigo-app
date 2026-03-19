import { useState } from "react";
import { AppLayout } from "@/components/layout";
import { useAuth } from "@/contexts/AuthContext";
import { useUserProfile } from "@/hooks/use-user-profile";
import { useLocation } from "wouter";
import { motion } from "framer-motion";
import {
  LogOut, Zap, Flame, Shield, BookOpen,
  ChevronRight, AlertTriangle, User,
} from "lucide-react";

export default function ProfilePage() {
  const { user, signOut } = useAuth();
  const { profile, refillEnergy } = useUserProfile();
  const [, setLocation] = useLocation();
  const [showConfirm, setShowConfirm] = useState(false);

  const handleSignOut = async () => {
    await signOut();
    setLocation("/");
  };

  const stats = [
    {
      icon: Shield,
      label: "Total EXP",
      value: profile?.exp ?? 0,
      color: "text-primary bg-primary/10",
    },
    {
      icon: Flame,
      label: "Streak",
      value: `${profile?.streak ?? 0} hari`,
      color: "text-warning bg-warning/10",
    },
    {
      icon: Zap,
      label: "Energi",
      value: `${profile?.energy ?? 5}/5`,
      color: "text-amber-500 bg-amber-100",
    },
    {
      icon: BookOpen,
      label: "Akun",
      value: user?.email?.split("@")[0] ?? "—",
      color: "text-correct bg-correct/10",
    },
  ];

  return (
    <AppLayout>
      <div className="p-4 md:p-6 w-full max-w-lg mx-auto pb-28">

        {/* Profile Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-primary/10 to-secondary/10 border-2 border-primary/20 rounded-3xl p-6 flex flex-col items-center text-center mb-6 shadow-sm"
        >
          {user?.photoURL ? (
            <img
              src={user.photoURL}
              alt={user.displayName ?? "Profil"}
              className="w-24 h-24 rounded-full border-4 border-primary shadow-lg mb-4 object-cover"
            />
          ) : (
            <div className="w-24 h-24 rounded-full border-4 border-primary bg-primary/20 flex items-center justify-center mb-4 shadow-lg">
              <User size={40} className="text-primary" />
            </div>
          )}
          <h2 className="text-2xl font-bold text-foreground">
            {profile?.name ?? user?.displayName ?? "Pelajar Chemigo"}
          </h2>
          <p className="text-muted-foreground text-sm mt-1">{user?.email}</p>
          <div className="mt-3 bg-primary/10 px-4 py-1.5 rounded-full">
            <span className="text-primary font-bold text-sm">Pelajar Kimia 🧪</span>
          </div>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-2 gap-3 mb-6"
        >
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="bg-card border-2 border-border rounded-2xl p-4 flex flex-col gap-2 shadow-sm"
            >
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${stat.color}`}>
                <stat.icon size={20} />
              </div>
              <div>
                <p className="text-xs text-muted-foreground font-semibold">{stat.label}</p>
                <p className="text-xl font-bold text-foreground truncate">{stat.value}</p>
              </div>
            </div>
          ))}
        </motion.div>

        {/* Energy Refill */}
        {(profile?.energy ?? 5) < 5 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="mb-4"
          >
            <button
              onClick={refillEnergy}
              className="w-full flex items-center justify-between bg-amber-50 border-2 border-amber-300 text-amber-700 font-bold py-4 px-5 rounded-2xl hover:bg-amber-100 transition-colors shadow-sm"
            >
              <div className="flex items-center gap-3">
                <Zap size={20} className="fill-amber-400 text-amber-500" />
                Isi Ulang Energi ke Penuh
              </div>
              <ChevronRight size={18} className="opacity-60" />
            </button>
          </motion.div>
        )}

        {/* Sign Out */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <button
            onClick={() => setShowConfirm(true)}
            className="w-full flex items-center justify-between bg-destructive/5 border-2 border-destructive/20 text-destructive font-bold py-4 px-5 rounded-2xl hover:bg-destructive/10 transition-colors"
          >
            <div className="flex items-center gap-3">
              <LogOut size={20} />
              Keluar dari Akun
            </div>
            <ChevronRight size={18} className="opacity-60" />
          </button>
        </motion.div>

        {/* Confirm modal */}
        {showConfirm && (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-end justify-center p-4">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-card border-2 border-border rounded-3xl p-6 w-full max-w-md shadow-2xl"
            >
              <div className="flex justify-center mb-4">
                <div className="w-14 h-14 bg-destructive/10 rounded-full flex items-center justify-center">
                  <AlertTriangle size={28} className="text-destructive" />
                </div>
              </div>
              <h3 className="text-xl font-bold text-center text-foreground mb-2">
                Keluar dari Akun?
              </h3>
              <p className="text-muted-foreground text-center text-sm mb-6">
                Progress belajarmu telah tersimpan di Firebase. Kamu bisa masuk kembali kapan saja.
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => setShowConfirm(false)}
                  className="flex-1 py-3 border-2 border-border rounded-2xl font-bold text-foreground hover:bg-muted transition-colors"
                >
                  Batal
                </button>
                <button
                  onClick={handleSignOut}
                  className="flex-1 py-3 bg-destructive border-2 border-destructive text-white rounded-2xl font-bold shadow-[0_4px_0_0_hsl(348,100%,40%)] hover:shadow-[0_2px_0_0_hsl(348,100%,40%)] hover:translate-y-[2px] transition-all"
                >
                  Keluar
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </AppLayout>
  );
}
