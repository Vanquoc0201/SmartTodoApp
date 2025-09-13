import { MODULETASK } from '@/constant/app.constant';
import axiosClient from './axiosClient';
import { TaskRewriteResult, AiMotivationResult, AiDailyPlanResult, AiSummaryResult } from '@/types/ai';
import { Task } from '@/types/task'; 

interface BackendResponse<T> {
  status: string;
  code: number;
  data: T;
  doc?: string;
}

const TASKS_MODULE_PATH = MODULETASK; 
const HABIT_MODULE_PATH = '/Habit'; 
const PLANNER_MODULE_PATH = '/Planner'; 

export const aiService = {
  async parseNaturalInput(input: string): Promise<Task> { 
    const response = await axiosClient.post<BackendResponse<Task>>(`${TASKS_MODULE_PATH}/Natural`, { input });
    return response.data.data; 
  },
  async rewriteTask(taskId: string, title: string, description?: string): Promise<{ rewrittenTitle?: string; rewrittenDescription?: string }> {
    const response = await axiosClient.post<BackendResponse<{ rewrittenTitle?: string; rewrittenDescription?: string }>>(`${TASKS_MODULE_PATH}/${taskId}/rewrite`, { title, description });
    return response.data.data; 
  },

  async analyzeHabit(): Promise<any> { 
    const response = await axiosClient.get<BackendResponse<any>>(`${HABIT_MODULE_PATH}/analyze`);
    return response.data.data; 
  },

  async getDailyPlan(): Promise<AiDailyPlanResult> {
    const response = await axiosClient.get<BackendResponse<AiDailyPlanResult>>(`${PLANNER_MODULE_PATH}/Daily-plan`);
    return response.data.data;
  },
};