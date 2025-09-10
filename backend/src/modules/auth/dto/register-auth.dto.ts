import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class RegisterDto {
  @IsEmail({}, { message: 'Email must be a valid email address' })
  @IsNotEmpty({ message: 'Email cannot be empty' })
  @ApiProperty({ example: 'user@example.com' })
  email: string;

  @IsString({ message: 'Password must be a string' })
  @IsNotEmpty({ message: 'Password cannot be empty' })
  @ApiProperty({ example: 'securePassword123' })
  password: string;

  @IsOptional()
  @IsString({ message: 'Name must be a string' })
  @ApiProperty({ example: 'John Doe', required: false })
  name?: string;
}