import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';


@Injectable()
export class ProductService {
  constructor(private prismaService: PrismaService) {}

  async getProduct() {
    let data = await this.prismaService.product.findMany();
    return data;
  }

  async getProductPagination(page: number, pageSize: number) {
    const skip = (page - 1) * pageSize;
    const data = await this.prismaService.product.findMany({
      skip: skip,
      take: pageSize,
    });

    const totalProducts = await this.prismaService.product.count(); 
    return {
      products: data,
      currentPage: page,
      totalPages: Math.ceil(totalProducts / pageSize),
      totalProducts: totalProducts,
    };
  }

  async searchProduct(query: string) {
    const data = await this.prismaService.product.findMany({
      where: {
        OR: [
          {
            product_name: {
              contains: query,
              mode: 'insensitive', 
            },
          },
          {
            description: {
              contains: query,
              mode: 'insensitive', 
            },
          },
        ],
      },
    });

    return data;
  }

  async getProductDetail(id) {
    let data = await this.prismaService.product.findFirst({
      where: {
        product_id: Number(id),
      },
    });
    return data;
  }

  async getCategory() {
    let data = await this.prismaService.category.findMany();
    return data;
  }

  async getProductType(categoryId) {
    let data = await this.prismaService.product.findMany({
      where: {
        category_id: categoryId,
      },
    });
    return data;
  }

  
}
