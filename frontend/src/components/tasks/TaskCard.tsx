// src/components/tasks/TaskCard.tsx
'use client';

import { useState } from 'react';
import { format, parseISO } from 'date-fns';
import { vi } from 'date-fns/locale';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { MoreVertical, Edit, Trash2, Clock } from 'lucide-react';
import { Task, Priority, TaskStatus } from '@/types/task';
import { useTasks } from '@/hooks/useTasks';
import { toast } from 'sonner';
import { UpdateTaskForm } from './UpdateTaskForm';

interface TaskCardProps {
  task: Task;
}

export function TaskCard({ task }: TaskCardProps) {
  const { updateTask, deleteTask } = useTasks();
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  const handleToggleTaskStatus = async (currentStatus: TaskStatus) => {
    const newStatus = currentStatus === 'COMPLETED' ? 'PENDING' : 'COMPLETED';
    const completedAt = newStatus === 'COMPLETED' ? new Date().toISOString() : undefined;
    try {
      await updateTask(task.id, { status: newStatus, completedAt });
      toast.success(newStatus === 'COMPLETED' ? 'Task đã hoàn thành!' : 'Task đã được mở lại.');
    } catch (err) {
      console.error('Failed to toggle task status:', err);
      toast.error('Cập nhật trạng thái task thất bại.');
    }
  };

  const handleDeleteTask = async () => {
    try {
      await deleteTask(task.id);
      toast.success('Task đã được xóa!');
    } catch (err) {
      console.error('Failed to delete task:', err);
      toast.error('Xóa task thất bại.');
    }
  };

  const getPriorityBadgeColor = (priority: Priority) => {
    switch (priority) {
      case 'HIGH': return 'bg-red-500 text-white hover:bg-red-600';
      case 'MEDIUM': return 'bg-yellow-500 text-white hover:bg-yellow-600';
      case 'LOW': return 'bg-green-500 text-white hover:bg-green-600';
      default: return 'bg-gray-500 text-white';
    }
  };

  const isOverdue = task.deadline && task.status !== 'COMPLETED' && parseISO(task.deadline) < new Date();

  return (
    <Card className={`p-4 flex flex-col ${task.status === 'COMPLETED' ? 'opacity-60 line-through' : ''} ${isOverdue ? 'border-red-500 border-2' : ''}`}>
      <div className="flex items-start justify-between mb-2">
        <div className="flex items-center space-x-2">
          <Checkbox
            checked={task.status === 'COMPLETED'}
            onCheckedChange={() => handleToggleTaskStatus(task.status)}
            id={`task-${task.id}`}
            disabled={task.status === 'OVERDUE'} // Không cho hoàn thành task đã quá hạn nếu chưa được sửa
          />
          <label
            htmlFor={`task-${task.id}`}
            className="text-lg font-semibold leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            {task.title}
          </label>
        </div>
        <div className="flex items-center space-x-2">
          {isOverdue && (
            <Badge variant="destructive" className="bg-red-600">Quá hạn</Badge>
          )}
          <Badge className={getPriorityBadgeColor(task.priority)}>
            {task.priority}
          </Badge>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
                <DialogTrigger asChild>
                  <DropdownMenuItem onSelect={(e) => e.preventDefault()}> {/* Prevent dropdown from closing */}
                    <Edit className="mr-2 h-4 w-4" /> Chỉnh sửa
                  </DropdownMenuItem>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Chỉnh sửa Task</DialogTitle>
                    <DialogDescription>
                      Cập nhật chi tiết task của bạn.
                    </DialogDescription>
                  </DialogHeader>
                  <UpdateTaskForm task={task} onTaskUpdated={() => setIsEditDialogOpen(false)} />
                </DialogContent>
              </Dialog>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <DropdownMenuItem onSelect={(e) => e.preventDefault()} className="text-red-600">
                    <Trash2 className="mr-2 h-4 w-4" /> Xóa
                  </DropdownMenuItem>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Bạn có chắc chắn muốn xóa?</AlertDialogTitle>
                    <AlertDialogDescription>
                      Hành động này không thể hoàn tác. Task "{task.title}" sẽ bị xóa vĩnh viễn.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Hủy</AlertDialogCancel>
                    <AlertDialogAction onClick={handleDeleteTask} className="bg-red-600 hover:bg-red-700 text-white">Xóa</AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      {task.description && (
        <p className="text-sm text-muted-foreground mb-2 flex-grow">{task.description}</p>
      )}
      {task.deadline && (
        <p className="text-xs text-muted-foreground flex items-center gap-1 mt-auto">
          <Clock className="h-3 w-3" /> Hạn chót: {format(parseISO(task.deadline), 'PP p', { locale: vi })}
        </p>
      )}
      {task.estimatedDurationMinutes && (
        <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
          <Clock className="h-3 w-3" /> Thời gian ước tính: {task.estimatedDurationMinutes} phút
        </p>
      )}
      {task.tags && task.tags.length > 0 && (
        <div className="flex flex-wrap gap-1 mt-2">
          {task.tags.map((tag, idx) => (
            <Badge key={idx} variant="secondary" className="text-xs px-2 py-0.5">
              {tag}
            </Badge>
          ))}
        </div>
      )}
    </Card>
  );
}