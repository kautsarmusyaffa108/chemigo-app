import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import { Atom } from "lucide-react";

import Home from "./pages/home";
import Lesson from "./pages/lesson";
import PeriodicTablePage from "./pages/periodic-table";
import LeaderboardPage from "./pages/leaderboard";
import ProfilePage from "./pages/profile";
import Welcome from "./pages/welcome";
import NotFound from "./pages/not-found";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

function LoadingScreen() {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center gap-4">
      <div className="bg-primary text-white p-4 rounded-2xl rotate-6 shadow-lg animate-pulse">
        <Atom size={36} className="-rotate-6" />
      </div>
      <p className="text-muted-foreground font-semibold animate-pulse">Memuat Chemigo...</p>
    </div>
  );
}

function AppRouter() {
  const { user, loading } = useAuth();

  if (loading) return <LoadingScreen />;
  if (!user) return <Welcome />;

  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/lesson/:id" component={Lesson} />
      <Route path="/periodic-table" component={PeriodicTablePage} />
      <Route path="/leaderboard" component={LeaderboardPage} />
      <Route path="/profile" component={ProfilePage} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <AuthProvider>
          <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
            <AppRouter />
          </WouterRouter>
          <Toaster />
        </AuthProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
