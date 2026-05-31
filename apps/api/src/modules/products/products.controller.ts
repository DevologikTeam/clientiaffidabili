import { Controller, Get, Param, ParseIntPipe, Query } from '@nestjs/common';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(private readonly products: ProductsService) {}

  @Get()
  findPublic() {
    return this.products.findPublic();
  }

  @Get('admin/catalog')
  findAdminCatalog() {
    return this.products.findAdminCatalog();
  }

  @Get('slug/:slug')
  findBySlug(@Param('slug') slug: string) {
    return this.products.findPublicBySlug(slug);
  }

  @Get(':code/price-snapshot')
  snapshot(@Param('code') code: string, @Query('quantity', new ParseIntPipe({ optional: true })) quantity = 1) {
    return this.products.createPriceSnapshot(code, quantity);
  }

  @Get(':code')
  async findOne(@Param('code') code: string) {
    const product = await this.products.findByCode(code);
    const [publicProduct] = (await this.products.findPublic()).filter((item) => item.code === product.code);
    return publicProduct;
  }
}
