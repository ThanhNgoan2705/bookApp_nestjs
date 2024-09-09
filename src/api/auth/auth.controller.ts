import { Body, Controller, Get, HttpCode, Param, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDTO } from '../../dto/login.dto';
import { UserRegisterDTO } from 'src/dto/user_register.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @HttpCode(200)
  async register(@Body() registerDto: UserRegisterDTO) {
    if (!registerDto.username) {
      return { message: 'Tên đăng nhập không được để trống' };
    }
    if (!registerDto.password) {
      return { message: 'Mật khẩu không được để trống' };
    }
    return this.authService.register(registerDto);
  }

  @Post('login')
  @HttpCode(200)
  async login(@Body() loginDto: LoginDTO) {
    if (!loginDto.username) {
      return { message: 'Email không được để trống' };
    }
    if (!loginDto.password) {
      return { message: 'Password không được để trống' };
    }

    return this.authService.login(loginDto);
  }

  @Get(':id')
  async getUserById(@Param('id') id: string) {
    const user = this.authService.getUserById(id);
    if (!user) {
      return { message: 'Không thể đăng nhập' };
    }
    return user;
  }

  @Post('google')
  async loginWithGoogle(@Body() body: any) {
    if (!body.id) {
      return { message: 'Id không được để trống' };
    }
    return this.authService.loginWithGoogle(body);
  }
}
