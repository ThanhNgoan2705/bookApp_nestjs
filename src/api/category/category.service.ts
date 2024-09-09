import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { v4 as uuv4 } from 'uuid';

@Injectable()
export class CategoryService {
  constructor(private prismaService: PrismaService) {}

  async getAllCategories() {
    const categories = await this.prismaService.category.findMany();
    return categories;
  }

  async createOrUpdateCategory(category: any) {
    if (category.id !== null && category.id !== undefined) {
      const updatedCategory = await this.prismaService.category.update({
        where: {
          id: category.id,
        },
        data: {
          name: category.name,
        },
      });

      return updatedCategory;
    } else {
      const newCategory = await this.prismaService.category.create({
        data: {
          id: uuv4(),
          name: category.name,
        },
      });
      return newCategory;
    }
  }

  async deleteCategoryById(id: string) {
    const deletedCategory = await this.prismaService.category.delete({
      where: {
        id: id,
      },
    });
    return deletedCategory;
  }
}
