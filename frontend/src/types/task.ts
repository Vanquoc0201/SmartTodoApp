export type Priority = 'HIGH' | 'MEDIUM' | 'LOW';
export type TaskStatus = 'PENDING' | 'IN_PROGRESS' | 'DONE';

export interface Task {
  id: string;
  userId: string;
  title: string;
  description?: string;
  priority: Priority;
  deadline?: string;
  status: TaskStatus;
  tags: string[];
  estimatedDurationMinutes?: number;
  createdAt: string;
  updatedAt: string;
  completedAt?: string; 
}

export interface CreateTaskPayload {
  title: string;
  description?: string;
  priority?: Priority;
  deadline?: string;
  status?: TaskStatus; 
  tags?: string[];
  estimated_duration_minutes?: number;
}

export interface UpdateTaskPayload {
  title?: string;
  description?: string;
  priority?: Priority;
  deadline?: string;
  status?: TaskStatus;
  tags?: string[];
  estimated_duration_minutes?: number;
  completedAt?: string; 
}
