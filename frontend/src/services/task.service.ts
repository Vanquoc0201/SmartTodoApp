import { MODULETASK } from '@/constant/app.constant';
import axiosClient from './axiosClient';
import { Task, CreateTaskPayload, UpdateTaskPayload } from '@/types/task';

interface BackendResponse<T> {
  status: string;
  code: number;
  data: T;
  doc?: string;
}

const TASKS_MODULE_PATH = MODULETASK;

export const taskService = {
  async createTask(payload: CreateTaskPayload): Promise<Task> {
    const response = await axiosClient.post<BackendResponse<Task>>(`${TASKS_MODULE_PATH}/CreateTask`, payload);
    return response.data.data; 
  },

  async getAllTasks(): Promise<Task[]> {
    const response = await axiosClient.get<BackendResponse<Task[]>>(`${TASKS_MODULE_PATH}/GetAllTask`);
    return response.data.data; 
  },

  async getTaskById(taskId: string): Promise<Task> {
    const response = await axiosClient.get<BackendResponse<Task>>(`${TASKS_MODULE_PATH}/GetTaskDetail/${taskId}`);
    return response.data.data;
  },

  async updateTask(taskId: string, payload: UpdateTaskPayload): Promise<Task> {
    const response = await axiosClient.patch<BackendResponse<Task>>(`${TASKS_MODULE_PATH}/UpdateTask/${taskId}`, payload);
    return response.data.data; 
  },

  async deleteTask(taskId: string): Promise<any> { 
    const response = await axiosClient.delete<BackendResponse<any>>(`${TASKS_MODULE_PATH}/DeleteTask/${taskId}`);
    return response.data.data;
  },
};