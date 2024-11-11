import { ApiProperty } from '@nestjs/swagger';
import { IsUUID, IsString, MinLength, MaxLength, IsInt, Min, IsOptional } from 'class-validator';

export class User {
  @ApiProperty({
    description: 'UUID of the user',
    example: '0a35dd62-e09f-444b-a628-f4e7c6954f57',
    format: 'uuid',
  })
  @IsUUID()
  id: string;

  @ApiProperty({
    description: 'User login',
    example: 'TEST_LOGIN',
    minLength: 4,
    maxLength: 255,
  })
  @IsString()
  @MinLength(4)
  @MaxLength(255)
  login: string;

  @ApiProperty({
    description: 'User password',
    example: 'TEST_PASSWORD',
    minLength: 4,
    maxLength: 30,
  })
  @IsString()
  @MinLength(4)
  @MaxLength(30)
  @IsOptional() // Password can be optional if only used internally
  password?: string;

  @ApiProperty({
    description: 'Version of the user record',
    example: 1,
  })
  @IsInt()
  @Min(1)
  version: number;

  @ApiProperty({
    description: 'Timestamp of user creation',
    example: 1655000000,
  })
  @IsInt()
  @Min(1)
  createdAt: number;

  @ApiProperty({
    description: 'Timestamp of last user update',
    example: 1655000000,
  })
  @IsInt()
  @Min(1)
  updatedAt: number;
}
