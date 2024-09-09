import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { v4 as uuv4 } from 'uuid';

@Injectable()
export class ReadingService {
  constructor(private readonly prismaService: PrismaService) {}

  async getAllReadings() {
    const readings = await this.prismaService.reading.findMany();
    return readings;
  }

  async getReadingByUserId(userId: string) {
    const readings = await this.prismaService.reading.findMany({
      where: {
        userId: userId,
      },
    });
    await Promise.all(
      readings.map(async (reading) => {
        const book = await this.prismaService.book.findUnique({
          where: {
            id: reading.bookId,
          },
        });
        // console.log(book);
        reading['book'] = book;
      }),
    );
    return readings;
  }

  async getReadingByBookId(bookId: string) {
    const readings = await this.prismaService.reading.findMany({
      where: {
        bookId: bookId,
      },
    });
    return readings;
  }

  async createOrUpdateReading(reading: any) {
    const readed = await this.prismaService.reading.findFirst({
      where: {
        userId: reading.userId,
        bookId: reading.bookId,
      },
    });

    if (readed) {
      const updatedReading = await this.prismaService.reading.update({
        where: {
          id: readed.id,
        },
        data: {
          userId: reading.userId,
          bookId: reading.bookId,
          page: reading.page,
        },
      });
      return updatedReading;
    } else {
      const newReading = await this.prismaService.reading.create({
        data: {
          id: uuv4(),
          userId: reading.userId,
          bookId: reading.bookId,
          page: reading.page,
        },
      });
      return newReading;
    }
  }

  async deleteReadingById(id: string) {
    const deletedReading = await this.prismaService.reading.delete({
      where: {
        id: id,
      },
    });
    return deletedReading;
  }
}
