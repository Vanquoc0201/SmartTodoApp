import { Module } from '@nestjs/common';
import { CronService } from './cron.service';
import { AiService } from '../ai/ai.service';
import { PlannerService } from '../planner/planner.service';
import { MailService } from '../mail/mail.service';
import { UserService } from '../user/user.service';
import { HabitService } from '../habit/habit.service';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  providers: [CronService,AiService,PlannerService,MailService,UserService,HabitService,PrismaService],
})
export class CronModule {}
