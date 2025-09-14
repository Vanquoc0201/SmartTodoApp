'use client';

import { useState } from 'react';
import { NaturalInputForm } from '@/components/tasks/NaturalInputForm';
import { CreateTaskForm } from '@/components/tasks/CreateTaskForm';
import { TaskCard } from '@/components/tasks/TaskCard'; 
import { useTasks } from '@/hooks/useTasks';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Sparkles, PlusCircle, Frown } from 'lucide-react';

export default function DashboardPage() {
  const { tasks, isLoading, error } = useTasks();
  const [isCreateTaskModalOpen, setIsCreateTaskModalOpen] = useState(false);

  if (error) {
    return (
      <div className="container py-8 text-red-500 flex flex-col items-center justify-center min-h-[calc(100vh-theme(spacing.16))]">
        <Frown className="h-16 w-16 mb-4" />
        <h2 className="text-2xl font-bold">Đã xảy ra lỗi khi tải task:</h2>
        <p className="text-lg">{error}</p>
      </div>
    );
  }

  return (
    <div className="container py-8 space-y-8">
      <h1 className="text-4xl font-bold text-center">Dashboard của bạn</h1>
      <p className="text-lg text-muted-foreground text-center">
        Quản lý và tạo task thông minh với sức mạnh của AI.
      </p>

      {/* Natural Input Form Section */}
      <Card className="max-w-2xl mx-auto p-6 shadow-lg">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold flex items-center justify-center space-x-2">
            <Sparkles className="h-6 w-6 text-primary" />
            <span>Tạo Task bằng AI</span>
          </CardTitle>
          <CardDescription>
            Gõ task bằng ngôn ngữ tự nhiên và AI sẽ lo phần còn lại.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <NaturalInputForm />
        </CardContent>
      </Card>

      {/* Button Tạo Task Thường */}
      <div className="flex justify-center mt-6">
        <Dialog open={isCreateTaskModalOpen} onOpenChange={setIsCreateTaskModalOpen}>
          <DialogTrigger asChild>
            <Button variant="outline" className="text-lg px-6 py-3">
              <PlusCircle className="mr-2 h-5 w-5" />
              Tạo Task thủ công
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Tạo Task Mới</DialogTitle>
              <DialogDescription>
                Nhập thông tin chi tiết cho task của bạn.
              </DialogDescription>
            </DialogHeader>
            <CreateTaskForm onTaskCreated={() => setIsCreateTaskModalOpen(false)} />
          </DialogContent>
        </Dialog>
      </div>

      {/* Task List Section */}
      <h2 className="text-3xl font-bold mt-12 mb-6 text-center">Task của bạn</h2>
      {isLoading && tasks.length === 0 ? (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <Card key={i} className="p-4 flex flex-col space-y-3">
              <Skeleton className="h-5 w-[80%]" />
              <Skeleton className="h-4 w-[90%]" />
              <Skeleton className="h-4 w-[70%]" />
              <div className="flex justify-between items-center mt-auto pt-2">
                <Skeleton className="h-6 w-[30%]" />
                <Skeleton className="h-6 w-[20%]" />
              </div>
            </Card>
          ))}
        </div>
      ) : tasks.length === 0 ? (
        <p className="text-center text-muted-foreground text-lg flex items-center justify-center gap-2">
          <Frown className="h-5 w-5" /> Bạn chưa có task nào. Hãy tạo một task mới bằng AI hoặc thủ công!
        </p>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {tasks.map((task) => (
            <TaskCard key={task.id} task={task} />
          ))}
        </div>
      )}
    </div>
  );
}