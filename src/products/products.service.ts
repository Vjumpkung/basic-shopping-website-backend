import { productSchema } from './../schemas/products.schema';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { ProductCreateDto } from './dto/product.create.dto';
import { ProductsGetDto } from './dto/product.get.dto';
import { ProductUpdateDto } from './dto/product.update.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel('products')
    private readonly productsModel: Model<productSchema>,
  ) {}

  async getProducts(productsGetDto: ProductsGetDto) {
    if (productsGetDto.status === 'all') {
      return await this.productsModel.find({ deleted_at: null }).exec();
    } else if (productsGetDto.status === 'publish') {
      return await this.productsModel
        .find({ published_at: { $ne: null }, deleted_at: null })
        .exec();
    }
  }

  async getProductById(id: Types.ObjectId) {
    return await this.productsModel.findOne({ _id: id, deleted_at: null });
  }

  async createProduct(productCreateDto: ProductCreateDto) {
    const product = new this.productsModel(productCreateDto);
    return await product.save();
  }

  async updateProduct(_id: Types.ObjectId, productUpdateDto: ProductUpdateDto) {
    await this.productsModel.updateOne(
      { _id: _id },
      { $set: productUpdateDto },
    );
  }

  async changeProductStatus(id: Types.ObjectId, isPublished: boolean) {
    await this.productsModel.updateOne(
      { _id: id },
      { $set: { published_at: isPublished ? new Date() : null } },
    );
  }

  async deleteProduct(id: Types.ObjectId) {
    await this.productsModel.updateOne(
      { _id: id },
      { $set: { deleted_at: new Date() } },
    );
  }
}
