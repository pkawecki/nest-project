import { UpdateProductDTO } from './dto/update-products.dto';
import { dateToArray } from './../shared/helpers/date.helper';
import { Product } from './interfaces/product.interface';
import { ExternalProductDto } from './dto/external-products.dto';
import { CreateProductDTO } from './dto/create-products.dto';
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ProductsDataService } from './products-data.service';

@Controller('products')
export class ProductsController {
  constructor(private productRepository: ProductsDataService) {}

  @Get(':id')
  getProductById(@Param('id') id: string): ExternalProductDto {
    return this.mapProductToExternal(this.productRepository.getProductById(id));
  }

  @Get('')
  getAllProducts(): Array<ExternalProductDto> {
    const prodArr = this.productRepository
      .getAllProducts()
      .map((x) => this.mapProductToExternal(x));
    return prodArr;
  }

  @Post()
  addProduct(@Body('product') product: CreateProductDTO): ExternalProductDto {
    return this.mapProductToExternal(
      this.productRepository.addProduct(product),
    );
  }

  @Delete(':id')
  @HttpCode(204)
  deleteProductById(@Param('id') id: string): void {
    this.productRepository.deleteProductById(id);
  }

  @Put(':id')
  updateProduct(
    @Param('id') id: string,
    @Body('product') product: UpdateProductDTO,
  ): ExternalProductDto {
    return this.mapProductToExternal(
      this.productRepository.updateProduct(id, product),
    );
  }

  mapProductToExternal(product: Product): ExternalProductDto {
    return {
      ...product,
      createdAt: dateToArray(product.createdAt),
      updatedAt: dateToArray(product.updatedAt),
    };
  }
}
