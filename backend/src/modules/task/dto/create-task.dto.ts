import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsEnum, IsArray, IsInt, IsDateString } from 'class-validator';
import { priority_level, task_status } from '@prisma/client';

export class CreateTaskDto {
  @ApiProperty({ example: 'Learn NestJS', description: 'Task title' })
  @IsString()
  title: string;

  @ApiProperty({ example: 'Learn CRUD with Prisma', required: false })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ example: 'MEDIUM', enum: priority_level, required: false })
  @IsOptional()
  @IsEnum(priority_level)
  priority?: priority_level;

  @ApiProperty({ example: '2025-09-20T12:00:00Z', required: false })
  @IsOptional()
  @IsDateString()
  deadline?: Date;

  @ApiProperty({ example: 'PENDING', enum: task_status, required: false })
  @IsOptional()
  @IsEnum(task_status)
  status?: task_status;

  @ApiProperty({ example: ['nestjs', 'prisma'], required: false })
  @IsOptional()
  @IsArray()
  tags?: string[];

  @ApiProperty({ example: 120, description: 'Estimated duration in minutes', required: false })
  @IsOptional()
  @IsInt()
  estimated_duration_minutes?: number; 
}
