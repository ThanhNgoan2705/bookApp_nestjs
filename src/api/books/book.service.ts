import { Injectable } from '@nestjs/common';
import { Book } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { v4 } from 'uuid';

@Injectable()
export class BookService {
  constructor(private prismaService: PrismaService) {}

  async getAllBooks() {
    const books = await this.prismaService.book.findMany();
    return books;
  }

  async getBookById(id: string) {
    const book = await this.prismaService.book.findUnique({
      where: {
        id: id,
      },
    });
    return book;
  }

  async getBookByKeyword(keyword: string) {
    const books = await this.prismaService.book.findMany({
      where: {
        title: {
          contains: keyword,
        },
      },
    });
    return books;
  }

  async getBookByCategory(category: string) {
    category = category.trim();
    const books = await this.prismaService.book.findMany({
      where: {
        category: {
          contains: category,
        },
      },
    });
    return books;
  }
  async createOrUpdateBook(book: Book) {
    if (book.id) {
      const updatedBook = await this.prismaService.book.update({
        where: {
          id: book.id,
        },
        data: {
          title: book.title,
          category: book.category,
          author: book.author,
          content: book.content,
          file: book.file,
          image: book.image,
        },
      });
      return updatedBook;
    }

    const createdBook = await this.prismaService.book.create({
      data: {
        id: v4(),
        title: book.title,
        views: 0,
        category: book.category,
        author: book.author,
        content: book.content,
        page: book.page ?? 0,
        file: book.file,
        image: book.image,
      },
    });
    return createdBook;
  }

  async deleteBookById(id: string) {
    const book = await this.prismaService.book.delete({
      where: {
        id: id,
      },
    });
    return book;
  }

  async getNewBooks() {
    const books = await this.prismaService.book.findMany({
      orderBy: {
        dateAdded: 'asc',
      },
      take: 10,
    });
    return books;
  }

  async getPoularBooks() {
    const books = await this.prismaService.book.findMany({
      orderBy: {
        views: 'desc',
      },
      take: 10,
    });
    return books;
  }
}
