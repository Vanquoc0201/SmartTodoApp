import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { HabitAnalysisDto } from './dto/habit-analysis.dto';
import { day_of_week, priority_level, task_status } from '@prisma/client';
import { TaskDto } from './dto/task.dto';

@Injectable()
export class HabitService {
  constructor(private readonly prisma: PrismaService) {}

  async analyzeTasks(tasks: TaskDto[]): Promise<HabitAnalysisDto> {
    if (!tasks.length) {
      return {
        most_active_hour_of_day: null,
        most_active_day_of_week: null,
        completion_rate: null,
        average_high_priority_completion_time_minutes: null,
      };
    }

    const hours = tasks
      .map((t) => t.created_at?.getHours())
      .filter((h) => h !== undefined && h !== null) as number[];
    const most_active_hour_of_day =
      hours.length > 0
        ? hours.sort(
            (a, b) =>
              hours.filter((h) => h === b).length -
              hours.filter((h) => h === a).length,
          )[0]
        : null;

    const days = tasks
      .map((t) => t.created_at?.getDay()) 
      .filter((d) => d !== undefined && d !== null) as number[];

    const most_active_day_of_week =
      days.length > 0
        ? (['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'][
            days.sort(
              (a, b) =>
                days.filter((d) => d === b).length -
                days.filter((d) => d === a).length,
            )[0]
          ] as day_of_week)
        : null;

    // 3. Completion rate
    const completed = tasks.filter((t) => t.status === task_status.COMPLETED);
    const completion_rate = tasks.length
      ? completed.length / tasks.length
      : null;

    const highPriorityCompleted = tasks.filter(
      (t) =>
        t.priority === priority_level.HIGH &&
        t.status === task_status.COMPLETED &&
        t.completed_at &&
        t.created_at,
    );
    const avgHighPriorityMinutes =
      highPriorityCompleted.length > 0
        ? Math.round(
            highPriorityCompleted.reduce(
              (acc, t) =>
                acc +
                ((t.completed_at!.getTime() - t.created_at!.getTime()) /
                  (1000 * 60)),
              0,
            ) / highPriorityCompleted.length,
          )
        : null;

    return {
      most_active_hour_of_day,
      most_active_day_of_week,
      completion_rate,
      average_high_priority_completion_time_minutes: avgHighPriorityMinutes,
    };
  }

  async updateUserHabit(userId: string, analysis: HabitAnalysisDto) {
    return this.prisma.habits.upsert({
      where: { user_id: userId },
      update: {
        most_active_hour_of_day: analysis.most_active_hour_of_day,
        most_active_day_of_week: analysis.most_active_day_of_week,
        completion_rate: analysis.completion_rate,
        average_high_priority_completion_time_minutes:
          analysis.average_high_priority_completion_time_minutes,
        last_analyzed_at: new Date(),
        updated_at: new Date(),
      },
      create: {
        user_id: userId,
        most_active_hour_of_day: analysis.most_active_hour_of_day,
        most_active_day_of_week: analysis.most_active_day_of_week,
        completion_rate: analysis.completion_rate,
        average_high_priority_completion_time_minutes:
          analysis.average_high_priority_completion_time_minutes,
      },
    });
  }
}
