import { ApiProperty } from '@nestjs/swagger';

export class User {
  @ApiProperty({
    description: 'UUID of the user',
    example: '0a35dd62-e09f-444b-a628-f4e7c6954f57',
    format: 'uuid',
  })
  id: string;

  @ApiProperty({
    description: 'Login of the user',
    example: 'TEST_LOGIN',
  })
  login: string;

  @ApiProperty({
    description: 'Version of the user record',
    example: 1,
  })
  version: number;

  @ApiProperty({
    description: 'Timestamp of user creation',
    example: 1655000000,
  })
  createdAt: number;

  @ApiProperty({
    description: 'Timestamp of last user update',
    example: 1655000000,
  })
  updatedAt: number;

  // Password is stored internally and excluded from responses
  password?: string;
}
