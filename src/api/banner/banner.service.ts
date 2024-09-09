import { Injectable } from '@nestjs/common';
import { Banner } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { v4 as uuv4 } from 'uuid';

@Injectable()
export class BannerService {
  constructor(private readonly prismaService: PrismaService) {}

  async getAllBanners() {
    const banners = await this.prismaService.banner.findMany();
    return banners;
  }

  async getBannerById(id: string) {
    const banner = await this.prismaService.banner.findUnique({
      where: {
        id: id,
      },
    });
    return banner;
  }

  async createBanner(banner: Banner) {
    const newBanner = await this.prismaService.banner.create({
      data: {
        id: uuv4(),
        image: banner.image,
      },
    });
    return newBanner;
  }

  async updateBanner(banner: Banner) {
    const updatedBanner = await this.prismaService.banner.update({
      where: {
        id: banner.id,
      },
      data: {
        image: banner.image,
      },
    });
    return updatedBanner;
  }

  async deleteBannerById(id: string) {
    const deletedBanner = await this.prismaService.banner.delete({
      where: {
        id: id,
      },
    });
    return deletedBanner;
  }
}
