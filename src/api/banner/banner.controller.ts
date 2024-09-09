import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { Banner } from '@prisma/client';
import { BannerService } from './banner.service';

@Controller('banners')
export class BannerController {
  constructor(private readonly bannerService: BannerService) {}

  @Get()
  async getAllBanners() {
    const banners = await this.bannerService.getAllBanners();
    return banners;
  }

  @Get(':id')
  async getBannerById(@Param('id') id: string) {
    const banner = await this.bannerService.getBannerById(id);
    return banner;
  }

  @Post()
  async createBanner(@Body() banner: Banner) {
    const newBanner = await this.bannerService.createBanner(banner);
    return newBanner;
  }

  @Put(':id')
  async updateBanner(@Param('id') id: string, @Body() banner: Banner) {
    banner.id = id; // make sure the ID is set
    const updatedBanner = await this.bannerService.updateBanner(banner);
    return updatedBanner;
  }

  @Delete(':id')
  async deleteBannerById(@Param('id') id: string) {
    const deletedBanner = await this.bannerService.deleteBannerById(id);
    return deletedBanner;
  }
}
