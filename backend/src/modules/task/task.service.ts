import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTaskInsightDto } from './dto/create-insight.dto';

@Injectable()
export class TaskService {
  constructor(private readonly prisma: PrismaService) {}

  async create(userId: string, dto: CreateTaskDto) {
    const task = await this.prisma.tasks.create({
      data: {
        user_id: userId,
        ...dto,
      },
    });
    return task;
  }

  async findAll(userId: string) {
    return this.prisma.tasks.findMany({
      where: { user_id: userId },
      orderBy: { created_at: 'desc' },
    });
  }

  async findOne(userId: string, id: string) {
    const task = await this.prisma.tasks.findUnique({ where: { id } });
    if (!task) throw new NotFoundException('Task not found');
    if (task.user_id !== userId) throw new ForbiddenException('No access to this task');
    return task;
  }

  async update(userId: string, id: string, dto: UpdateTaskDto) {
    const task = await this.findOne(userId, id);
    return this.prisma.tasks.update({
      where: { id: task.id },
      data: { ...dto, updated_at: new Date() },
    });
  }

  async remove(userId: string, id: string) {
    const task = await this.findOne(userId, id);
    return this.prisma.tasks.delete({ where: { id: task.id } });
  }

  async saveInsight(taskId: string, userId: string, dto: CreateTaskInsightDto) {
    return this.prisma.task_insights.create({
      data: {
        task_id: taskId,
        user_id: userId,
        summary: dto.summary,
        motivation: dto.motivation,
        rewritten_title: dto.rewritten_title,
        rewritten_description: dto.rewritten_description,
      },
    });
  }

}
