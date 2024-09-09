import { Module } from '@nestjs/common';
import { AuthModule } from 'src/api/auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { BooksModule } from './api/books/books.module';
import { CategoryModule } from './api/category/category.module';
import { CommentModule } from './api/comment/comment.module';
import { UploadModule } from './api/upload/upload.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { BannerModule } from './api/banner/banner.module';
import { FavoriteModule } from './api/favorate/favorate.module';
import { UsersModule } from './api/users/users.module';
import { ReadingModule } from './api/reading/reading.module';

@Module({
  imports: [
    AuthModule,
    PrismaModule,
    BooksModule,
    CategoryModule,
    CommentModule,
    UploadModule,
    BannerModule,
    FavoriteModule,
    ReadingModule,
    UsersModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'uploads'),
    }),
  ],
})
export class AppModule {}
