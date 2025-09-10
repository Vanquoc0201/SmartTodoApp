import { IsNumberString, IsOptional, IsString } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class PaginationDto {
  @IsNumberString({}, { message: 'page must be a number string' })
  @ApiPropertyOptional({ example: '1', description: 'Page number' })
  page: string | number;

  @IsNumberString({}, { message: 'pageSize must be a number string' })
  @ApiPropertyOptional({ example: '10', description: 'Number of items per page' })
  pageSize: string | number;

  @IsOptional()
  @IsString({ message: 'search must be a string' })
  @ApiPropertyOptional({ example: 'John', description: 'Search keyword' })
  search?: string;
}
