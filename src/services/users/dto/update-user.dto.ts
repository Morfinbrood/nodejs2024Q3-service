import { IsString, IsOptional, MinLength, MaxLength } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateUserDto {
  @ApiPropertyOptional({
    description: "User's new login",
    example: 'NEW_LOGIN',
    minLength: 4,
    maxLength: 255,
  })
  @IsOptional()
  @IsString()
  @MinLength(4)
  @MaxLength(255)
  login?: string;

  @ApiPropertyOptional({
    description: "User's new email",
    example: 'user@example.com',
    minLength: 5,
    maxLength: 255,
  })
  @IsOptional()
  @IsString()
  @MinLength(5)
  @MaxLength(255)
  email?: string;
}
