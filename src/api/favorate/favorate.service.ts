import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { v4 as uuv4 } from 'uuid';

@Injectable()
export class FavoriteService {
  constructor(private readonly prismaService: PrismaService) {}

  async getAllFavorites() {
    const favorates = await this.prismaService.favorateBook.findMany();
    return favorates;
  }
  async getFavoriteByUserId(userId: string) {
    const favorates = await this.prismaService.favorateBook.findMany({
      where: {
        userId: userId,
      },
    });

    const books = await this.prismaService.book.findMany({
      where: {
        id: {
          in: favorates.map((favorate) => favorate.bookId),
        },
      },
    });

    console.log(books);
    return books;
  }

  async getFavoriteByBookId(bookId: string) {
    const favorates = await this.prismaService.favorateBook.findMany({
      where: {
        bookId: bookId,
      },
    });
    return favorates;
  }

  async createFavorite(userId: string, bookId: string) {
    const newFavorite = await this.prismaService.favorateBook.create({
      data: {
        id: uuv4(),
        userId: userId,
        bookId: bookId,
      },
    });
    return newFavorite;
  }

  async deleteFavorite(userId: string, bookId: string) {
    const deletedFavorite = await this.prismaService.favorateBook.deleteMany({
      where: {
        userId: userId,
        bookId: bookId,
      },
    });
    return deletedFavorite;
  }
}
