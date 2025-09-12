import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { PlannerService } from '../planner/planner.service';
import { AiService } from '../ai/ai.service';
import { MailService } from '../mail/mail.service';
import { UserService } from '../user/user.service';
import { HabitService } from '../habit/habit.service';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class CronService {
  private readonly logger = new Logger(CronService.name);

  constructor(
    private readonly plannerService: PlannerService,
    private readonly aiService: AiService,
    private readonly mailService: MailService,
    private readonly userService: UserService,
    private readonly habitService: HabitService,
    private readonly prisma: PrismaService,
  ) {}
  @Cron('0 7 * * *') 
  async dailyReminderJob() {
    this.logger.log('Starting Daily Reminder Job...');
    const users = await this.userService.getAllUser();

    for (const user of users.data) {
      try {
        const { plan, stats } = await this.plannerService.generateDailyPlan(user.id);

        const summary = await this.aiService.generateSummary(plan);
        const motivation = await this.aiService.generateMotivation({
          completedTasks: stats.completed,
          upcomingTasks: stats.upcoming,
          overdueTasks: stats.overdue,
        });

        await this.mailService.sendDailyReminder({
          user,
          tasks: plan,
          aiSummary: summary,
          aiMotivation: motivation,
        });

        this.logger.log(`Daily reminder sent to ${user.email}`);
      } catch (err) {
        this.logger.error(`Failed to send daily reminder for user ${user.id}`, err);
      }
    }
  }

  @Cron('0 0 * * 0') 
  async habitAnalysisJob() {
    this.logger.log('Starting Habit Analysis Job...');
    const users = await this.userService.getAllUser();

    for (const user of users.data) {
      try {
        const tasks = await this.prisma.tasks.findMany({
          where: { user_id: user.id },
        });
        const analysis = await this.habitService.analyzeTasks(tasks);
        await this.habitService.updateUserHabit(user.id, analysis);
        this.logger.log(`Habit analysis updated for user ${user.email}`);
      } catch (err) {
        this.logger.error(`Failed to analyze habits for user ${user.id}`, err);
      }
    }
  }
}
