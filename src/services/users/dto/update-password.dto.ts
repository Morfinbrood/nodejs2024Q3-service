import { IsString, MinLength, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdatePasswordDto {
  @ApiProperty({
    description: "User's old password",
    example: 'OLD_PASSWORD',
  })
  @IsString()
  oldPassword: string;

  @ApiProperty({
    description: "User's new password",
    example: 'NEW_PASSWORD',
    minLength: 3,
    maxLength: 30,
  })
  @IsString()
  @MinLength(3)
  @MaxLength(30)
  newPassword: string;
}
