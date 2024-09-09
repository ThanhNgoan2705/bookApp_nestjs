import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { Category } from '@prisma/client';
import { CategoryService } from './category.service';

@Controller('category')
export class CategoryController {
  constructor(private categoryService: CategoryService) {}

  @Get()
  async getAllCategories() {
    const categories = await this.categoryService.getAllCategories();
    return categories;
  }

  @Post()
  async createCategory(@Body() category: any) {
    const newCategory = await this.categoryService.createOrUpdateCategory(
      category,
    );
    return newCategory;
  }

  @Put(':id')
  async updateCategory(@Param('id') id: string, @Body() category: Category) {
    category.id = id;
    const updatedCategory = await this.categoryService.createOrUpdateCategory(
      category,
    );
    return updatedCategory;
  }

  @Delete(':id')
  async deleteCategory(@Param('id') id: string) {
    const deletedCategory = await this.categoryService.deleteCategoryById(id);
    return deletedCategory;
  }
}
