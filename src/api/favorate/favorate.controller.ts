import { Controller, Get, Param, Post, Delete } from '@nestjs/common';
import { FavoriteService } from './favorate.service';

@Controller('favorite')
export class FavoriteController {
  constructor(private readonly favorateService: FavoriteService) {}

  @Get()
  async getAllFavorites() {
    return await this.favorateService.getAllFavorites();
  }

  @Get(':userId')
  async getFavoriteByUserId(@Param('userId') userId: string) {
    return await this.favorateService.getFavoriteByUserId(userId);
  }

  @Get('book/:bookId')
  async getFavoriteByBookId(@Param('bookId') bookId: string) {
    return await this.favorateService.getFavoriteByBookId(bookId);
  }

  @Post(':userId/:bookId')
  async createFavorite(
    @Param('userId') userId: string,
    @Param('bookId') bookId: string,
  ) {
    console.log(userId, bookId);
    return await this.favorateService.createFavorite(userId, bookId);
  }

  @Delete(':userId/:bookId')
  async deleteFavorite(
    @Param('userId') userId: string,
    @Param('bookId') bookId: string,
  ) {
    return await this.favorateService.deleteFavorite(userId, bookId);
  }
}
