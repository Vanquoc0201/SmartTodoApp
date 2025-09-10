import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';
import { TaskModule } from './modules/task/task.module';
import { AiModule } from './modules/ai/ai.module';
import { HabitModule } from './modules/habit/habit.module';
import { PlannerModule } from './modules/planner/planner.module';
import { MailModule } from './modules/mail/mail.module';
import { CronModule } from './modules/cron/cron.module';
import { PrismaService } from './modules/prisma/prisma.service';
import { ProtectStrategy } from './modules/auth/protect/protect.strategy';

@Module({
  imports: [AuthModule, UserModule, TaskModule, AiModule, HabitModule, PlannerModule, MailModule, CronModule],
  controllers: [AppController],
  providers: [AppService,PrismaService,ProtectStrategy],
})
export class AppModule {}
