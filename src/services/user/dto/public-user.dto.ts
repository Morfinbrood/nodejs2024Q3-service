import { ApiProperty } from '@nestjs/swagger';
import {
  IsUUID,
  IsString,
  IsInt,
  Min,
  MinLength,
  MaxLength,
} from 'class-validator';
import { User } from '@prisma/client';

export class PublicUserDto {
  constructor(user: User) {
    this.id = user.id;
    this.login = user.login;
    this.version = user.version;
    this.createdAt = Math.floor(user.createdAt.getTime() / 1000);
    this.updatedAt = Math.floor(user.updatedAt.getTime() / 1000);
  }

  @ApiProperty({
    description: 'UUID of the user',
    example: '0a35dd62-e09f-444b-a628-f4e7c6954f57',
    format: 'uuid',
  })
  @IsString()
  @IsUUID()
  id: string;

  @ApiProperty({
    description: 'User login',
    example: 'TEST_LOGIN',
    minLength: 4,
    maxLength: 30,
  })
  @IsString()
  @MinLength(4)
  @MaxLength(30)
  login: string;

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
