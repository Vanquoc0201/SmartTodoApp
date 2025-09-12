import { ApiProperty } from '@nestjs/swagger';
import { day_of_week } from '@prisma/client';

export class HabitAnalysisDto {
  @ApiProperty({ required: false, nullable: true })
  most_active_hour_of_day: number | null;

  @ApiProperty({ enum: day_of_week, required: false, nullable: true })
  most_active_day_of_week: day_of_week | null;

  @ApiProperty({ required: false, nullable: true })
  completion_rate: number | null;

  @ApiProperty({ required: false, nullable: true })
  average_high_priority_completion_time_minutes: number | null;
}
