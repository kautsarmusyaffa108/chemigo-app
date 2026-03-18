import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { motion } from "framer-motion";
import { Atom, Flame, Heart, Shield, Zap, BookOpen, Trophy } from "lucide-react";

const features = [
  {
    icon: Heart,
    color: "text-destructive bg-destructive/10",
    title: "Sistem Nyawa",
    desc: "Jawab dengan hati-hati! Kamu punya 5 nyawa tiap sesi belajar.",
  },
  {
    icon: Zap,
    color: "text-warning bg-warning/10",
    title: "Kumpulkan XP",
    desc: "Selesaikan pelajaran dan raih poin pengalaman untuk naik peringkat.",
  },
  {
    icon: BookOpen,
    color: "text-primary bg-primary/10",
    title: "Tabel Periodik Interaktif",
    desc: "Eksplorasi 118 unsur kimia dengan cara yang menyenangkan.",
  },
];

export default function Welcome() {
  const { signInWithGoogle } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGoogleLogin = async () => {
    setIsLoading(true);
    setError(null);
    try {
      await signInWithGoogle();
    } catch (err: any) {
      if (err.code !== "auth/popup-closed-by-user") {
        setError("Gagal masuk. Pastikan pop-up tidak diblokir dan coba lagi.");
      }
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/10 flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-5">
        <div className="flex items-center gap-2 text-primary font-bold text-2xl">
          <div className="bg-primary text-white p-2 rounded-xl rotate-3 shadow-md">
            <Atom size={22} className="-rotate-3" />
          </div>
          Chemigo
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-8 max-w-md mx-auto w-full">

        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <div className="relative inline-flex items-center justify-center w-28 h-28 bg-primary/10 rounded-3xl rotate-6 mb-6 shadow-lg">
            <Atom size={60} className="text-primary -rotate-6" />
            <div className="absolute -top-2 -right-2 bg-warning text-white text-xs font-bold px-2 py-1 rounded-full -rotate-12">
              FUN!
            </div>
          </div>
          <h1 className="text-4xl font-bold text-foreground mb-3 leading-tight">
            Belajar Kimia<br />
            <span className="text-primary">Seru Seperti Game!</span>
          </h1>
          <p className="text-muted-foreground text-lg leading-relaxed">
            Kuasai Tabel Periodik dengan cara yang menyenangkan, interaktif, dan penuh tantangan.
          </p>
        </motion.div>

        {/* Features */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="w-full flex flex-col gap-3 mb-10"
        >
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + i * 0.1 }}
              className="flex items-center gap-4 bg-card border border-border rounded-2xl p-4 shadow-sm"
            >
              <div className={`p-3 rounded-xl ${f.color} flex-shrink-0`}>
                <f.icon size={22} />
              </div>
              <div>
                <h3 className="font-bold text-foreground text-sm">{f.title}</h3>
                <p className="text-muted-foreground text-xs mt-0.5">{f.desc}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Login Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="w-full"
        >
          {error && (
            <div className="bg-destructive/10 border border-destructive/20 text-destructive text-sm rounded-xl p-3 mb-4 text-center font-medium">
              {error}
            </div>
          )}

          <button
            onClick={handleGoogleLogin}
            disabled={isLoading}
            className="w-full flex items-center justify-center gap-3 bg-white border-2 border-border text-foreground font-bold py-4 px-6 rounded-2xl shadow-[0_4px_0_0_hsl(214,32%,80%)] hover:shadow-[0_2px_0_0_hsl(214,32%,80%)] hover:translate-y-[2px] active:shadow-none active:translate-y-[4px] transition-all duration-150 disabled:opacity-60 disabled:cursor-not-allowed text-base"
          >
            {isLoading ? (
              <div className="w-5 h-5 border-2 border-primary border-t-transparent rounded-full animate-spin" />
            ) : (
              <svg viewBox="0 0 24 24" width="22" height="22">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
            )}
            {isLoading ? "Memproses..." : "Masuk dengan Google"}
          </button>

          <p className="text-center text-xs text-muted-foreground mt-4 leading-relaxed">
            Dengan masuk, kamu menyetujui syarat penggunaan Chemigo.
            Progress belajarmu akan tersimpan di akunmu.
          </p>
        </motion.div>
      </div>

      {/* Bottom decoration */}
      <div className="flex items-center justify-center gap-6 px-6 py-5 text-muted-foreground">
        <div className="flex items-center gap-1.5 text-xs font-semibold">
          <Flame size={14} className="text-warning" /> Streak harian
        </div>
        <div className="flex items-center gap-1.5 text-xs font-semibold">
          <Shield size={14} className="text-primary" /> Poin XP
        </div>
        <div className="flex items-center gap-1.5 text-xs font-semibold">
          <Trophy size={14} className="text-yellow-500" /> Papan peringkat
        </div>
      </div>
    </div>
  );
}
