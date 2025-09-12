import { ApiProperty } from '@nestjs/swagger';
import { day_of_week } from '@prisma/client';

export class UpdateHabitDto {
  @ApiProperty({ required: false, nullable: true })
  most_active_hour_of_day: number | null;

  @ApiProperty({ enum: day_of_week, required: false, nullable: true })
  most_active_day_of_week: day_of_week | null; 

  @ApiProperty()
  completion_rate: number;

  @ApiProperty({ required: false })
  last_analyzed_at?: Date;
}
