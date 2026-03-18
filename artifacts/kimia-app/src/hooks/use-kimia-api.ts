import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getSessionId } from "@/lib/session";
import type { 
  UserProgress, 
  SaveProgressRequest, 
  Question, 
  LeaderboardEntry,
  GetQuestionsParams
} from "@workspace/api-client-react";

// Fallback initial data in case backend isn't fully implemented
const defaultProgress: UserProgress = {
  id: 1,
  sessionId: getSessionId(),
  hearts: 5,
  xp: 0,
  streak: 0,
  completedLessons: [],
};

export function useProgress() {
  const sessionId = getSessionId();
  
  return useQuery({
    queryKey: ['progress', sessionId],
    queryFn: async (): Promise<UserProgress> => {
      try {
        const res = await fetch(`/api/progress?sessionId=${sessionId}`);
        if (!res.ok) {
          // If endpoint fails/missing, return local mock for frontend robustness
          return defaultProgress;
        }
        return await res.json();
      } catch (e) {
        return defaultProgress;
      }
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
}

export function useSaveProgress() {
  const queryClient = useQueryClient();
  const sessionId = getSessionId();

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
        ...newProgress
      }));
      
      return { previous };
    },
    onError: (err, newProgress, context) => {
      if (context?.previous) {
        queryClient.setQueryData(['progress', sessionId], context.previous);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['progress', sessionId] });
    }
  });
}

// Mock questions generator in case backend is missing
const generateMockQuestions = (lessonId: string): Question[] => {
  return [
    {
      id: "q1", lessonId, type: "multiple_choice",
      question: "Which element is an Alkali Metal?",
      options: ["Helium", "Lithium", "Oxygen", "Iron"],
      correctAnswer: "Lithium", difficulty: "easy", xpReward: 10,
      explanation: "Lithium is in Group 1, making it an Alkali Metal."
    },
    {
      id: "q2", lessonId, type: "symbol_guess",
      question: "What is the chemical symbol for Gold?",
      options: ["Go", "Ag", "Au", "Gd"],
      correctAnswer: "Au", difficulty: "medium", xpReward: 15,
      explanation: "Au comes from the Latin word 'Aurum'."
    },
    {
      id: "q3", lessonId, type: "multiple_choice",
      question: "Noble gases are known for being...",
      options: ["Highly reactive", "Very colorful", "Unreactive", "Good conductors"],
      correctAnswer: "Unreactive", difficulty: "easy", xpReward: 10,
      explanation: "Noble gases have a full outer electron shell, making them stable and unreactive."
    }
  ];
};

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
      } catch (e) {
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
        if (!res.ok) {
          // Mock data
          return [
            { rank: 1, sessionId: "user-1", xp: 1250, streak: 12, completedLessonsCount: 8 },
            { rank: 2, sessionId: getSessionId(), xp: 850, streak: 5, completedLessonsCount: 4 },
            { rank: 3, sessionId: "user-3", xp: 620, streak: 2, completedLessonsCount: 3 },
          ];
        }
        return await res.json();
      } catch(e) {
         return [
            { rank: 1, sessionId: "user-1", xp: 1250, streak: 12, completedLessonsCount: 8 },
            { rank: 2, sessionId: getSessionId(), xp: 850, streak: 5, completedLessonsCount: 4 },
            { rank: 3, sessionId: "user-3", xp: 620, streak: 2, completedLessonsCount: 3 },
          ];
      }
    }
  });
}
