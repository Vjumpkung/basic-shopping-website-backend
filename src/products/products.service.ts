import { productSchema } from './../schemas/products.schema';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel('products')
    private readonly productsModel: Model<productSchema>,
  ) {}
}
