import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class CreateTaskInsightDto {
  @ApiProperty({ example: 'This task helps you focus better', required: false })
  @IsOptional()
  @IsString()
  summary?: string;

  @ApiProperty({ example: 'Stay consistent to build habit', required: false })
  @IsOptional()
  @IsString()
  motivation?: string;

  @ApiProperty({ example: 'Master NestJS Basics', required: false })
  @IsOptional()
  @IsString()
  rewritten_title?: string;

  @ApiProperty({ example: 'Practice CRUD operations with NestJS + Prisma', required: false })
  @IsOptional()
  @IsString()
  rewritten_description?: string;
}
