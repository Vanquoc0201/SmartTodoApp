'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { useState } from 'react';
import { format } from 'date-fns';
import { Calendar as CalendarIcon, Loader2 } from 'lucide-react';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { cn } from '@/lib/utils';
import { Priority, CreateTaskPayload } from '@/types/task';
import { useTasks } from '@/hooks/useTasks';

const formSchema = z.object({
  title: z.string().min(1, { message: 'Tiêu đề không được để trống.' }).max(100, { message: 'Tiêu đề quá dài.' }),
  description: z.string().max(500, { message: 'Mô tả quá dài.' }).optional(),
  priority: z.enum(['LOW', 'MEDIUM', 'HIGH'], { message: 'Mức độ ưu tiên không hợp lệ.' }),
  deadline: z.date().optional().nullable(),
  tags: z.string().optional(),
  estimatedDurationMinutes: z.number().int().min(5).optional(),
});

export function CreateTaskForm({ onTaskCreated }: { onTaskCreated?: () => void }) {
  const [loading, setLoading] = useState(false);
  const { addTask } = useTasks();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      description: '',
      priority: 'MEDIUM',
      deadline: undefined,
      tags: '',
      estimatedDurationMinutes: undefined,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);
    try {
      const payload: CreateTaskPayload = {
        title: values.title,
        description: values.description || undefined,
        priority: values.priority,
        deadline: values.deadline ? values.deadline.toISOString() : undefined,
        tags: values.tags ? values.tags.split(',').map(tag => tag.trim()).filter(tag => tag.length > 0) : [],
        estimatedDurationMinutes: values.estimatedDurationMinutes,
      };
      
      const newTask = await addTask(payload);
      form.reset();
      if (onTaskCreated) {
        onTaskCreated();
      }
    } catch (error) {
      console.error('Error creating task:', error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tiêu đề task</FormLabel>
              <FormControl>
                <Input placeholder="Ví dụ: Chuẩn bị báo cáo cuối kỳ" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Mô tả (Tùy chọn)</FormLabel>
              <FormControl>
                <Textarea placeholder="Chi tiết công việc..." {...field} rows={3} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="priority"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Mức độ ưu tiên</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Chọn mức độ ưu tiên" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="HIGH">Cao</SelectItem>
                  <SelectItem value="MEDIUM">Trung bình</SelectItem>
                  <SelectItem value="LOW">Thấp</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="deadline"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Hạn chót (Tùy chọn)</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={'outline'}
                      className={cn(
                        'w-full pl-3 text-left font-normal',
                        !field.value && 'text-muted-foreground'
                      )}
                    >
                      {field.value ? (
                        format(field.value, 'PPP HH:mm')
                      ) : (
                        <span>Chọn ngày & giờ</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value || undefined}
                    onSelect={field.onChange}
                    disabled={(date) => date < new Date()}
                    initialFocus
                  />
                  {field.value && (
                    <div className="p-2 border-t flex justify-center">
                      <Input
                        type="time"
                        value={format(field.value, 'HH:mm')}
                        onChange={(e) => {
                          const [hours, minutes] = e.target.value.split(':').map(Number);
                          const newDate = new Date(field.value as Date);
                          newDate.setHours(hours, minutes);
                          field.onChange(newDate);
                        }}
                        className="w-fit"
                      />
                    </div>
                  )}
                </PopoverContent>
              </Popover>
              <FormDescription>
                Đặt ngày và giờ hoàn thành cho task này.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="tags"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tags (Tùy chọn)</FormLabel>
              <FormControl>
                <Input placeholder="Ví dụ: công việc, học tập, cá nhân" {...field} />
              </FormControl>
              <FormDescription>
                Ngăn cách các tags bằng dấu phẩy.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="estimatedDurationMinutes"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Thời gian ước tính (phút - Tùy chọn)</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="Ví dụ: 60"
                  {...field}
                  onChange={e => field.onChange(e.target.value ? Number(e.target.value) : undefined)}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full" disabled={loading}>
          {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {loading ? 'Đang tạo...' : 'Tạo Task'}
        </Button>
      </form>
    </Form>
  );
}