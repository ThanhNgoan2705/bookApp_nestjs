import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { Reading } from '@prisma/client';
import { ReadingService } from './reading.service';

@Controller('readings')
export class ReadingController {
  constructor(private readonly readingService: ReadingService) {}

  @Get()
  async getAllReadings() {
    const readings = await this.readingService.getAllReadings();
    return readings;
  }

  @Get(':userId')
  async getReadingByUserId(@Param('userId') userId: string) {
    const readings = await this.readingService.getReadingByUserId(userId);
    return readings;
  }

  @Get('/book/')
  async getReadingByBookId(@Param('bookId') bookId: string) {
    const readings = await this.readingService.getReadingByBookId(bookId);
    return readings;
  }

  @Post()
  async updateReading(@Body() reading: Reading) {
    const updatedReading = await this.readingService.createOrUpdateReading(
      reading,
    );
    return updatedReading;
  }
}
