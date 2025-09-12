import { Module } from '@nestjs/common';
import { HabitController } from './habit.controller';
import { HabitService } from './habit.service';
import { TaskService } from '../task/task.service';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  controllers: [HabitController],
  providers: [HabitService,TaskService,PrismaService],
  exports: [HabitService]
})
export class HabitModule {}
