import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsOptional, IsString, Matches } from 'class-validator';

export class AddUserDto {
  @IsEmail({}, { message: 'Invalid email format' })
  @IsNotEmpty({ message: 'Email cannot be empty' })
  @ApiProperty({ example: 'johndoe@example.com', description: 'User email' })
  email: string;

  @IsString({ message: 'Password must be a string' })
  @IsNotEmpty({ message: 'Password cannot be empty' })
  @ApiProperty({ example: 'securePassword123', description: 'User password' })
  password: string;

  @IsOptional()
  @IsString({ message: 'Name must be a string' })
  @ApiProperty({ example: 'John Doe', description: 'User full name', required: false })
  name?: string;
}
