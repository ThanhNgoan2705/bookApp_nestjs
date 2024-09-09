import { Injectable } from '@nestjs/common';
import { LoginDTO } from 'src/dto/login.dto';
import { UserRegisterDTO } from 'src/dto/user_register.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { v4 } from 'uuid';
import * as crypto from 'crypto';

@Injectable()
export class AuthService {
  constructor(private prismaService: PrismaService) {}

  async register(registerDto: UserRegisterDTO) {
    const check = await this.prismaService.user.findFirst({
      where: {
        username: registerDto.username,
      },
    });
    if (check) {
      return { message: 'Email đã tồn tại' };
    }
    const hashedPassword = crypto
      .createHash('md5')
      .update(registerDto.password)
      .digest('hex');
    const user = this.prismaService.user.create({
      data: {
        id: v4(),
        username: registerDto.username,
        password: hashedPassword,
        token: v4(),
      },
    });
    return user;
  }

  async login(loginDto: LoginDTO) {
    const user = await this.prismaService.user.findUnique({
      where: {
        username: loginDto.username,
      },
    });
    if (!user) {
      return { message: 'Email không tồn tại' };
    }
    const hashedPassword = crypto
      .createHash('md5')
      .update(loginDto.password)
      .digest('hex');

    if (user.password !== hashedPassword) {
      return { message: 'Password không chính xác' };
    }
    return user;
  }
  async getUserById(token: string) {
    const user = await this.prismaService.user.findUnique({
      where: {
        id: token,
      },
    });
    return user;
  }
  async loginWithGoogle(body: any) {
    const findUser = await this.prismaService.user.findFirst({
      where: {
        id: body.id,
      },
    });
    if (findUser) {
      return findUser;
    }

    const user = await this.prismaService.user.create({
      data: {
        id: body.id,
        username: body.username,
        email: body.email,
        image: body.image,
        password: '',
      },
    });
    return user;
  }
}
