import { IsString, MinLength, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { IUpdatePassword } from '../../../interfaces/user.interfaces';

export class UpdatePasswordDto implements IUpdatePassword {
  @ApiProperty({
    description: 'Old user password',
    example: 'OLD_PASSWORD',
    minLength: 4,
    maxLength: 30,
  })
  @IsString()
  @MinLength(4)
  @MaxLength(30)
  oldPassword: string;

  @ApiProperty({
    description: 'New user password',
    example: 'NEW_PASSWORD',
    minLength: 4,
    maxLength: 30,
  })
  @IsString()
  @MinLength(4)
  @MaxLength(30)
  newPassword: string;
}
