import { Module } from '@nestjs/common';
import { FavoriteController } from './favorate.controller';
import { FavoriteService } from './favorate.service';

@Module({
  controllers: [FavoriteController],
  providers: [FavoriteService],
})
export class FavoriteModule {}
