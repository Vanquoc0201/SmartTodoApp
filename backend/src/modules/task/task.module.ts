import { Module } from '@nestjs/common';
import { TaskController } from './task.controller';
import { TaskService } from './task.service';
import { PassportModule } from '@nestjs/passport';
import { PrismaService } from '../prisma/prisma.service';
import { AiService } from '../ai/ai.service';
@Module({
  imports : [PassportModule],
  controllers: [TaskController],
  providers: [TaskService,PrismaService, AiService]
})
export class TaskModule {}
