import { Controller, Get, Param, Query } from '@nestjs/common';
import { ProductService } from './product.service';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get('/get-all')
  getProduct() {
    return this.productService.getProduct();
  }

  @Get('/get-category')
  getCategory() {
    return this.productService.getCategory();
  }

  @Get('/get-product-type/:categoryId')
  getProductType(@Param('categoryId') categoryId) {
    return this.productService.getProductType(+categoryId);
  }

  @Get('/pagination')
  async getProductPagination(
    @Query('page') page: string = '1', 
    @Query('pageSize') pageSize: string = '10',
  ) {
    const pageNumber = parseInt(page, 10); 
    const pageSizeNumber = parseInt(pageSize, 10); 
    return this.productService.getProductPagination(pageNumber, pageSizeNumber);
  }

  
  @Get('/search')
  async searchProduct(@Query('query') query: string) {
    return this.productService.searchProduct(query);
  }

  @Get('/get-product-detail/:id')
  getProductDetail(@Param('id') id) {
    return this.productService.getProductDetail(id);
  }
}
