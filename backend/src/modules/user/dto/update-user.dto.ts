import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsEmail, IsOptional, IsString } from 'class-validator';

export class UpdateUserDto {
  @IsOptional()
  @IsString({ message: 'Name must be a string' })
  @ApiPropertyOptional({ example: 'John Doe', description: 'User full name' })
  name?: string;

  @IsOptional()
  @IsEmail({}, { message: 'Invalid email format' })
  @ApiPropertyOptional({ example: 'johndoe@example.com', description: 'User email' })
  email?: string;
}
