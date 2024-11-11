import { OmitType } from '@nestjs/swagger';
import { User } from './user.model';

export class PublicUser extends OmitType(User, ['password'] as const) {}
