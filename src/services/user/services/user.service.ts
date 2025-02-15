import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdatePasswordDto } from '../dto/update-password.dto';
import { PublicUserDto } from '../dto/public-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async getAllUsers(): Promise<PublicUserDto[]> {
    const users = await this.prisma.user.findMany();
    return users.map((user) => new PublicUserDto(user));
  }

  async getPublicUserById(id: string): Promise<PublicUserDto> {
    const user = await this.prisma.user.findUnique({ where: { id } });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return new PublicUserDto(user);
  }

  async createUser(createUserDto: CreateUserDto): Promise<PublicUserDto> {
    const { login, password } = createUserDto;
    const existingUser = await this.prisma.user.findUnique({
      where: { login },
    });
    if (existingUser) {
      throw new BadRequestException('User with this login already exists');
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await this.prisma.user.create({
      data: {
        login,
        password: hashedPassword,
      },
    });
    return new PublicUserDto(user);
  }

  async updateUserPassword(
    id: string,
    updatePasswordDto: UpdatePasswordDto,
  ): Promise<PublicUserDto> {
    const { oldPassword, newPassword } = updatePasswordDto;
    const user = await this.prisma.user.findUnique({ where: { id } });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    const passwordValid = await bcrypt.compare(oldPassword, user.password);
    if (!passwordValid) {
      throw new BadRequestException('Old password is incorrect');
    }
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    const updatedUser = await this.prisma.user.update({
      where: { id },
      data: {
        password: hashedPassword,
        version: user.version + 1,
      },
    });
    return new PublicUserDto(updatedUser);
  }

  async deleteUser(id: string): Promise<void> {
    try {
      await this.prisma.user.delete({ where: { id } });
    } catch {
      throw new NotFoundException('User not found');
    }
  }
}
