import { IsString, MinLength, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { ICreateUser } from '../../../interfaces/user.interfaces';

export class CreateUserDto implements ICreateUser {
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
