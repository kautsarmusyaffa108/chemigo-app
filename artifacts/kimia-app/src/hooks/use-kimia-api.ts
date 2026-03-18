import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "@/contexts/AuthContext";
import type {
  UserProgress,
  SaveProgressRequest,
  Question,
  LeaderboardEntry,
  GetQuestionsParams
} from "@workspace/api-client-react";

const defaultProgress = (sessionId: string): UserProgress => ({
  id: 1,
  sessionId,
  hearts: 5,
  xp: 0,
  streak: 0,
  completedLessons: [],
});

export function useProgress() {
  const { user } = useAuth();
  const sessionId = user?.uid ?? "anonymous";

  return useQuery({
    queryKey: ['progress', sessionId],
    queryFn: async (): Promise<UserProgress> => {
      try {
        const res = await fetch(`/api/progress?sessionId=${encodeURIComponent(sessionId)}`);
        if (!res.ok) return defaultProgress(sessionId);
        return await res.json();
      } catch {
        return defaultProgress(sessionId);
      }
    },
    enabled: !!user,
    staleTime: 1000 * 60 * 5,
  });
}

export function useSaveProgress() {
  const queryClient = useQueryClient();
  const { user } = useAuth();
  const sessionId = user?.uid ?? "anonymous";

  return useMutation({
    mutationFn: async (data: Partial<SaveProgressRequest>) => {
      const payload: SaveProgressRequest = {
        sessionId,
        hearts: data.hearts ?? 5,
        xp: data.xp ?? 0,
        streak: data.streak ?? 0,
        completedLessons: data.completedLessons ?? [],
        currentLesson: data.currentLesson,
      };
      const res = await fetch(`/api/progress`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("Failed to save progress");
      return await res.json();
    },
    onMutate: async (newProgress) => {
      await queryClient.cancelQueries({ queryKey: ['progress', sessionId] });
      const previous = queryClient.getQueryData(['progress', sessionId]);
      queryClient.setQueryData(['progress', sessionId], (old: any) => ({
        ...old,
        ...newProgress,
      }));
      return { previous };
    },
    onError: (_err, _newProgress, context) => {
      if (context?.previous) {
        queryClient.setQueryData(['progress', sessionId], context.previous);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['progress', sessionId] });
    },
  });
}

const generateMockQuestions = (lessonId: string): Question[] => [
  {
    id: "q1", lessonId, type: "multiple_choice",
    question: "Unsur mana yang termasuk Logam Alkali?",
    options: ["Helium", "Litium", "Oksigen", "Besi"],
    correctAnswer: "Litium", difficulty: "easy", xpReward: 10,
    explanation: "Litium berada di Golongan 1, sehingga termasuk Logam Alkali."
  },
  {
    id: "q2", lessonId, type: "symbol_guess",
    question: "Apa simbol kimia untuk Emas?",
    options: ["Go", "Ag", "Au", "Gd"],
    correctAnswer: "Au", difficulty: "medium", xpReward: 15,
    explanation: "Au berasal dari kata Latin 'Aurum'."
  },
  {
    id: "q3", lessonId, type: "multiple_choice",
    question: "Gas mulia dikenal karena...",
    options: ["Sangat reaktif", "Berwarna-warni", "Tidak reaktif", "Konduktor baik"],
    correctAnswer: "Tidak reaktif", difficulty: "easy", xpReward: 10,
    explanation: "Gas mulia memiliki konfigurasi elektron penuh, sehingga sangat stabil dan tidak reaktif."
  }
];

export function useQuestions(params: GetQuestionsParams) {
  return useQuery({
    queryKey: ['questions', params],
    queryFn: async (): Promise<Question[]> => {
      const searchParams = new URLSearchParams();
      if (params.lessonId) searchParams.append("lessonId", params.lessonId);
      if (params.difficulty) searchParams.append("difficulty", params.difficulty);
      try {
        const res = await fetch(`/api/questions?${searchParams.toString()}`);
        if (!res.ok) return generateMockQuestions(params.lessonId);
        return await res.json();
      } catch {
        return generateMockQuestions(params.lessonId);
      }
    },
    enabled: !!params.lessonId,
  });
}

export function useLeaderboard() {
  return useQuery({
    queryKey: ['leaderboard'],
    queryFn: async (): Promise<LeaderboardEntry[]> => {
      try {
        const res = await fetch(`/api/leaderboard`);
        if (!res.ok) throw new Error("not ok");
        return await res.json();
      } catch {
        return [
          { rank: 1, sessionId: "ChemiMaster", xp: 1250, streak: 12, completedLessonsCount: 8 },
          { rank: 2, sessionId: "PeriodicPro", xp: 850, streak: 5, completedLessonsCount: 4 },
          { rank: 3, sessionId: "AtomAce", xp: 620, streak: 2, completedLessonsCount: 3 },
        ];
      }
    },
  });
}
