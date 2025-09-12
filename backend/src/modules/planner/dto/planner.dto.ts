import { ApiProperty } from '@nestjs/swagger';

export class PlannerSuggestionDto {
  @ApiProperty()
  taskId: string;

  @ApiProperty()
  title: string;  

  @ApiProperty({ required: false })
  description?: string;

  @ApiProperty()
  suggestedStart: Date;

  @ApiProperty()
  suggestedEnd: Date;

  @ApiProperty()
  reason: string;
}
