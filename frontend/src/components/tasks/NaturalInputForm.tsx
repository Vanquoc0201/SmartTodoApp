'use client';

import { useState } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Loader2, Sparkles } from 'lucide-react';
import { toast } from 'sonner';
import { aiService } from '@/services/ai.service';
import { useTasks } from '@/hooks/useTasks'; 

export function NaturalInputForm() {
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const { fetchTasks } = useTasks(); 

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) {
      toast.warning('Vui lòng nhập nội dung task.');
      return;
    }

    setLoading(true);
    try {
      toast.info('AI đang phân tích và tạo task của bạn...');
      const newTask = await aiService.parseNaturalInput(input); 
      
      toast.success(`"${newTask.title}" đã được tạo bằng AI!`);
      setInput(''); 
      fetchTasks(); 
    } catch (error: any) {
      console.error('Error creating task with natural input:', error);
      toast.error(error.message || 'Tạo task bằng AI thất bại.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Textarea
        placeholder="Nhập task bằng ngôn ngữ tự nhiên. Ví dụ: 'Viết báo cáo dự án Marketing vào thứ 6 tuần sau, ưu tiên cao.' hoặc 'Mua sữa và trứng chiều nay.'"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        rows={4}
        className="resize-none"
        disabled={loading}
      />
      <Button type="submit" className="w-full" disabled={loading}>
        {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        {!loading && <Sparkles className="mr-2 h-4 w-4" />}
        {loading ? 'Đang tạo task...' : 'Tạo Task bằng AI'}
      </Button>
    </form>
  );
}