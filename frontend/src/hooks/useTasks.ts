'use client';

import { useState, useEffect, useCallback } from 'react';
import { taskService } from '@/services/task.service';
import { Task, CreateTaskPayload, UpdateTaskPayload } from '@/types/task';
import { toast } from 'sonner';

export const useTasks = (initialTasks: Task[] = []) => {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchTasks = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const fetchedTasks = await taskService.getAllTasks();
      setTasks(fetchedTasks);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch tasks');
      toast.error(err.message || 'Lấy danh sách task thất bại.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const addTask = async (payload: CreateTaskPayload) => {
    setIsLoading(true);
    setError(null);
    try {
      const newTask = await taskService.createTask(payload);
      setTasks((prevTasks) => [newTask, ...prevTasks]);
      toast.success('Task đã được tạo thành công!');
      return newTask;
    } catch (err: any) {
      setError(err.message || 'Failed to add task');
      toast.error(err.message || 'Tạo task thất bại.');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const updateTask = async (taskId: string, payload: UpdateTaskPayload) => {
    setIsLoading(true);
    setError(null);
    try {
      const updatedTask = await taskService.updateTask(taskId, payload);
      setTasks((prevTasks) =>
        prevTasks.map((task) => (task.id === taskId ? updatedTask : task))
      );
      toast.success('Task đã được cập nhật!');
      return updatedTask;
    } catch (err: any) {
      setError(err.message || 'Failed to update task');
      toast.error(err.message || 'Cập nhật task thất bại.');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const deleteTask = async (taskId: string) => {
    setIsLoading(true);
    setError(null);
    try {
      await taskService.deleteTask(taskId);
      setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
      toast.success('Task đã được xóa!');
    } catch (err: any) {
      setError(err.message || 'Failed to delete task');
      toast.error(err.message || 'Xóa task thất bại.');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    tasks,
    isLoading,
    error,
    addTask,
    updateTask,
    deleteTask,
    fetchTasks,
  };
};