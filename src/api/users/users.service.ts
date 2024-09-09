import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import * as crypto from 'crypto';

@Injectable()
export class UsersService {
  constructor(private readonly prismaService: PrismaService) {}

  async getAllUsers() {
    const users = await this.prismaService.user.findMany();
    return users;
  }

  async getUserById(id: string) {
    const user = await this.prismaService.user.findUnique({
      where: {
        id: id,
      },
    });
    return user;
  }

  async getUserByUsername(username: string) {
    const user = await this.prismaService.user.findFirst({
      where: {
        username: username,
      },
    });
    return user;
  }

  async updateUser(user: User) {
    const oldUser = await this.prismaService.user.findFirst({
      where: {
        id: user.id,
      },
    });

    if (!oldUser) {
      return {
        message: 'Tài khoản không tồn tại',
      };
    }

    const checkExitName = await this.prismaService.user.findFirst({
      where: {
        username: user.username,
      },
    });

    if (checkExitName && checkExitName.id !== user.id) {
      return {
        message: 'Tên đăng nhập đã tồn tại',
      };
    }

    return this.prismaService.user.update({
      where: {
        id: user.id,
      },
      data: {
        username: user.username,
        email: user.email,
        phone: user.phone,
        image: user.image,
      },
    });
  }
  async changePassword(body: any) {
    const user = await this.prismaService.user.findFirst({
      where: {
        id: body.id,
      },
    });

    if (!user) {
      return {
        message: 'Id không tồn tại',
      };
    }
    const hashedPassword = crypto
      .createHash('md5')
      .update(body.oldPassword)
      .digest('hex');

    if (user.password !== hashedPassword) {
      return {
        message: 'Mật khẩu không chính xác',
      };
    }
    const hashedNewPassword = crypto
      .createHash('md5')
      .update(body.newPassword)
      .digest('hex');
    return this.prismaService.user.update({
      where: {
        id: body.id,
      },
      data: {
        password: hashedNewPassword,
      },
    });
  }

  async updateRole(body: any) {
    const user = await this.prismaService.user.update({
      where: {
        id: body.id,
      },
      data: {
        role: body.role,
      },
    });
    return user;
  }
  deleteUser(id: any) {
    return this.prismaService.user.delete({
      where: {
        id: id,
      },
    });
  }
}
