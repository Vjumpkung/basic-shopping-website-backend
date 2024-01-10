import { productSchema } from './../schemas/products.schema';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { ProductCreateDto } from './dto/product.create.dto';
import { ProductUpdateDto } from './dto/product.update.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel('products')
    private readonly productsModel: Model<productSchema>,
  ) {}

  async getProducts(status: string) {
    if (status === 'all') {
      return await this.productsModel
        .aggregate([
          {
            $match: {
              deleted_at: null,
            },
          },
          {
            $lookup: {
              from: 'choices',
              localField: 'choices',
              foreignField: '_id',
              as: 'choices',
            },
          },
        ])
        .exec();
    } else if (status === 'publish') {
      return await this.productsModel
        .aggregate([
          {
            $match: {
              published_at: {
                $ne: null,
              },
              deleted_at: null,
            },
          },
          {
            $lookup: {
              from: 'choices',
              localField: 'choices',
              foreignField: '_id',
              as: 'choices',
            },
          },
        ])
        .exec();
    }
  }

  async getProductById(id: Types.ObjectId) {
    const res = await this.productsModel
      .aggregate([
        {
          $match: {
            _id: id,
            published_at: {
              $ne: null,
            },
            deleted_at: null,
          },
        },
        {
          $lookup: {
            from: 'choices',
            localField: 'choices',
            foreignField: '_id',
            as: 'choices',
          },
        },
      ])
      .exec();
    return res[0];
  }

  async createProduct(productCreateDto: ProductCreateDto) {
    productCreateDto.choices = productCreateDto.choices?.map((choice) => {
      choice = new Types.ObjectId(choice);
      return choice;
    });
    const product = new this.productsModel(productCreateDto);
    return await product.save();
  }

  async updateProduct(_id: Types.ObjectId, productUpdateDto: ProductUpdateDto) {
    productUpdateDto.choices = productUpdateDto.choices.map((choice) => {
      choice = new Types.ObjectId(choice);
      return choice;
    });

    await this.productsModel
      .updateOne({ _id: _id }, { $set: productUpdateDto })
      .exec();
  }

  async changeProductStatus(id: Types.ObjectId, isPublished: boolean) {
    await this.productsModel
      .updateOne(
        { _id: id },
        { $set: { published_at: isPublished ? new Date() : null } },
      )
      .exec();
  }

  async deleteProduct(id: Types.ObjectId) {
    await this.productsModel
      .updateOne({ _id: id }, { $set: { deleted_at: new Date() } })
      .exec();
  }

  async updateAvailable(id: Types.ObjectId, isAvailable: boolean) {
    await this.productsModel
      .updateOne({ _id: id }, { $set: { isAvailable: isAvailable } })
      .exec();
  }
}
