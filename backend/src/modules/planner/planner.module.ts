import { Module } from '@nestjs/common';
import { PlannerController } from './planner.controller';
import { PlannerService } from './planner.service';
import { AiService } from '../ai/ai.service';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  controllers: [PlannerController],
  providers: [PlannerService,AiService,PrismaService],
  exports: [PlannerService]
})
export class PlannerModule {}
