

export interface TaskRewriteResult {
  rewrittenTitle?: string;
  rewrittenDescription?: string;
}

export interface AiMotivationResult {
  motivation: string;
}

export interface AiSummaryResult {
  summary: string;
}

export interface AiDailyPlanResult {
  date: string;
  mostProductiveHour?: string;
  plan: {
    taskId: string;
    title: string;
    priority: 'HIGH' | 'MEDIUM' | 'LOW'; // Cần định nghĩa lại hoặc import Priority từ task.ts
    deadline?: string;
    suggestedTime: string; // e.g., "09:00 - 10:00"
    isOverdue: boolean;
  }[];
  unscheduledTasks: number;
}