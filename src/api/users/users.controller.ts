import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from '@prisma/client';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UsersService) {}

  @Get()
  async getAllUsers() {
    return await this.userService.getAllUsers();
  }

  @Get(':id')
  async getUserById(id: string) {
    return await this.userService.getUserById(id);
  }

  // update user
  @Put()
  async updateUser(@Body() user: User) {
    if (!user.id) {
      return {
        message: 'Id không được để trống',
      };
    }
    if (!user.username) {
      return {
        message: 'Tên đăng nhập không được để trống',
      };
    }
    return await this.userService.updateUser(user);
  }
  // change password
  @Post('password')
  async changePassword(@Body() body: any) {
    if (!body.id) {
      return {
        message: 'Id không được để trống',
      };
    }
    if (!body.oldPassword) {
      return {
        message: 'Mật khẩu không được để trống',
      };
    }
    if (!body.newPassword) {
      return {
        message: 'Mật khẩu mới không được để trống',
      };
    }
    if (!body.confirmPassword) {
      return {
        message: 'Xác nhận mật khẩu không được để trống',
      };
    }
    if (body.newPassword !== body.confirmPassword) {
      return {
        message: 'Mật khẩu mới và xác nhận mật khẩu không trùng khớp',
      };
    }
    return await this.userService.changePassword(body);
  }

  @Post('role')
  async updateRole(@Body() body: any) {
    if (!body.id) {
      return {
        message: 'Id không được để trống',
      };
    }
    if (!body.role) {
      return {
        message: 'Vai trò không được để trống',
      };
    }
    return await this.userService.updateRole(body);
  }

  // delete user
  @Delete(':id')
  async deleteUser(@Param('id') id: string) {
    if (!id) {
      return {
        message: 'Id không được để trống',
      };
    }
    return await this.userService.deleteUser(id);
  }
}
