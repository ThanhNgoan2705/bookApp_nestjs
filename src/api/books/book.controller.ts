import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { Book } from '@prisma/client';
import { BookService } from './book.service';

@Controller('books')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Get()
  async getAllBooks() {
    return await this.bookService.getAllBooks();
  }
  @Get('/news')
  async getNewBook() {
    return await this.bookService.getNewBooks();
  }

  @Get('/popular')
  async getPopularBook() {
    return await this.bookService.getPoularBooks();
  }
  @Get(':id')
  async getBookById(@Param('id') id: string) {
    return await this.bookService.getBookById(id);
  }

  @Get('/search/:keyword')
  async getBookByKeyword(@Param('keyword') keyword: string) {
    return await this.bookService.getBookByKeyword(keyword);
  }

  @Get('/category/:category')
  async getBookByCategory(@Param('category') category: string) {
    return await this.bookService.getBookByCategory(category);
  }

  @Post()
  async createOrUpdateBook(@Body() book: Book) {
    return await this.bookService.createOrUpdateBook(book);
  }

  @Delete(':id')
  async deleteBookById(@Param('id') id: string) {
    return await this.bookService.deleteBookById(id);
  }
}
