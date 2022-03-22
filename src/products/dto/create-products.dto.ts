import { Tags } from '../enums/tags.enum';

export interface CreateProductDTO {
  name: string;
  price: number;
  count: number;
  tags: Array<Tags>;
  createdAt: Date;
  updatedAt: Date;
}
