import { IsString, MinLength, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
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
  password: string;
}
