import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { HabitService } from '../habit/habit.service';
import { AiService } from '../ai/ai.service';
import { PlannerSuggestionDto } from './dto/planner.dto';

@Injectable()
export class PlannerService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly aiService: AiService,
  ) {}

  async generateDailyPlan(userId: string): Promise<{
  plan: PlannerSuggestionDto[];
  stats: { completed: number; upcoming: number; overdue: number };
}> {
  const tasks = await this.prisma.tasks.findMany({
    where: { user_id: userId },
    orderBy: { deadline: 'asc' },
  });

  const habit = await this.prisma.habits.findUnique({
    where: { user_id: userId },
  });
  const startHour = habit?.most_active_hour_of_day ?? 9;
  let currentHour = startHour;
  const pendingTasks = tasks.filter(
    (t) => t.status === 'PENDING' || t.status === 'OVERDUE',
  );
  const aiReasons = await this.aiService.rewriteTasks(
    pendingTasks.map((task) => ({
      title: task.title,
      deadline: task.deadline,
      priority: task.priority,
      status: task.status,
    })),
  );

  const plan: PlannerSuggestionDto[] = [];

  pendingTasks.forEach((task, index) => {
    const suggestedStart = new Date();
    suggestedStart.setHours(currentHour, 0, 0, 0);

    const suggestedEnd = new Date(suggestedStart);
    suggestedEnd.setMinutes(
      suggestedEnd.getMinutes() + (task.estimatedDurationMinutes ?? 60),
    );

    currentHour++;

    const reason =
      aiReasons?.[index] ||
      (habit
        ? `Dựa trên thói quen giờ vàng ${startHour}h`
        : 'Sắp xếp theo deadline gần nhất');

    plan.push({
      taskId: task.id,
      title: task.title,
      description: task.description ?? '',
      suggestedStart,
      suggestedEnd,
      reason,
    });
  });

  const stats = {
    completed: tasks.filter((t) => t.status === 'COMPLETED').length,
    upcoming: tasks.filter((t) => t.status === 'PENDING').length,
    overdue: tasks.filter((t) => t.status === 'OVERDUE').length,
  };

  return { plan, stats };
}


}
