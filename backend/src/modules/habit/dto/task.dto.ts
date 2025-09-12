import { ApiProperty } from '@nestjs/swagger';
import { task_status, priority_level } from '@prisma/client';

export class TaskDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  user_id: string;

  @ApiProperty()
  title: string;

  @ApiProperty({ required: false, nullable: true })
  description?: string | null;

  @ApiProperty({ enum: priority_level, required: false, nullable: true })
  priority?: priority_level | null;

  @ApiProperty({ required: false, nullable: true })
  deadline?: Date | null;

  @ApiProperty({ enum: task_status, required: false, nullable: true })
  status?: task_status | null;

  @ApiProperty({ type: [String], required: false })
  tags?: string[];

  @ApiProperty({ required: false, nullable: true })
  estimated_duration_minutes?: number | null;

  @ApiProperty({ required: false, nullable: true })
  completed_at?: Date | null;

  @ApiProperty({ required: false, nullable: true })
  created_at?: Date | null;

  @ApiProperty({ required: false, nullable: true })
  updated_at?: Date | null;
}
