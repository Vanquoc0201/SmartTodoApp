import { ApiProperty } from '@nestjs/swagger';

export class UserResponseDto {
  @ApiProperty({ example: 'a3f2b8f0-3d5a-4a2e-9c6c-7a2c8d12a123' })
  id: string; 

  @ApiProperty({ example: 'user@example.com' })
  email: string;

  @ApiProperty({ example: 'John Doe', required: false })
  name?: string;

  @ApiProperty({ example: '2025-09-10T10:20:30Z' })
  created_at: Date;

  @ApiProperty({ example: '2025-09-10T10:20:30Z' })
  updated_at: Date;
}
