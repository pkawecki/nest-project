import { UpdateProductDTO } from './dto/update-products.dto';
import { Tags } from './enums/tags.enum';
import { CreateProductDTO } from './dto/create-products.dto';
import { Injectable } from '@nestjs/common';
import { Product } from './interfaces/product.interface';
import { nanoid } from 'nanoid';

@Injectable()
export class ProductsDataService {
  products: Product[] = [
    {
      id: 'b73Hw',
      name: 'someName',
      price: 1243,
      count: 1,
      tags: [Tags.NEW],
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ];

  addProduct(newProduct: CreateProductDTO) {
    const date = new Date();
    const reqProd = {
      id: nanoid(5),
      name: newProduct.name,
      price: newProduct.price,
      count: newProduct.count,
      tags: newProduct.tags,
      createdAt: date,
      updatedAt: date,
    };

    this.products.push(reqProd);
    return reqProd;
  }

  getAllProducts(): Array<Product> {
    return this.products;
  }

  getProductById(id: string): Product {
    const prod = this.products.find((x) => (x.id = id));
    return prod;
  }

  updateProduct(id: string, product: UpdateProductDTO): Product {
    const searchedProd = this.products.find((x) => (x.id = id));
    const index = this.products.indexOf(searchedProd);
    const keys = Object.keys(product);
    for (const key of keys) {
      if (product[key]) {
        searchedProd[key] = product[key];
      }
    }
    this.products.splice(index, 1);
    searchedProd.updatedAt = new Date();
    return searchedProd;
  }

  deleteProductById(id: string): boolean {
    const initLength = this.products.length;
    this.products = this.products.filter((x) => x.id !== id);
    const finalLength = this.products.length;
    return initLength == finalLength + 1;
  }
}
