import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { shoppingSchema } from 'src/schemas/shopping_cart.schema';
import { AddToCartDto } from './dto/cart.add.dto';
import { UpdateToCartDto } from './dto/cart.update.dto';

@Injectable()
export class ShoppingCartService {
  constructor(
    @InjectModel('shopping_cart')
    private readonly shoppingCartModel: Model<shoppingSchema>,
  ) {}

  async getCartByUserId(userId: Types.ObjectId) {
    return await this.shoppingCartModel
      .aggregate([
        {
          $match: {
            user: userId,
            is_ordered: false,
            deleted_at: null,
          },
        },
        {
          $lookup: {
            from: 'products',
            localField: 'product',
            foreignField: '_id',
            as: 'product',
          },
        },
        {
          $match: {
            'product.deleted_at': null,
          },
        },
        {
          $unwind: {
            path: '$product',
            includeArrayIndex: '0',
            preserveNullAndEmptyArrays: false,
          },
        },
        {
          $match: {
            $expr: {
              $cond: [
                {
                  $in: ['$choice', '$product.choices'],
                },
                'choice',
                {
                  $eq: ['$choice', null],
                },
              ],
            },
          },
        },
        {
          $lookup: {
            from: 'choices',
            localField: 'choice',
            foreignField: '_id',
            as: 'choice',
          },
        },
        {
          $unwind: {
            path: '$choice',
            includeArrayIndex: '0',
            preserveNullAndEmptyArrays: true,
          },
        },
        {
          $addFields: {
            choice: {
              $cond: [
                {
                  $in: ['$choice._id', '$product.choices'],
                },
                '$choice',
                null,
              ],
            },
          },
        },
        {
          $addFields: {
            total_price: {
              $multiply: [
                {
                  $cond: [
                    {
                      $eq: ['$choice', null],
                    },
                    '$product.price',
                    '$choice.price',
                  ],
                },
                '$amount',
              ],
            },
          },
        },
      ])
      .exec();
  }

  async getCartByCartIds(cartId: Types.ObjectId[]) {
    return await this.shoppingCartModel
      .aggregate([
        {
          $match: {
            _id: { $in: cartId },
            is_ordered: false,
            deleted_at: null,
          },
        },
        {
          $lookup: {
            from: 'products',
            localField: 'product',
            foreignField: '_id',
            as: 'product',
          },
        },
        {
          $match: {
            'product.deleted_at': null,
          },
        },
        {
          $unwind: {
            path: '$product',
            includeArrayIndex: '0',
            preserveNullAndEmptyArrays: false,
          },
        },
        {
          $match: {
            $expr: {
              $cond: [
                {
                  $in: ['$choice', '$product.choices'],
                },
                'choice',
                {
                  $eq: ['$choice', null],
                },
              ],
            },
          },
        },
        {
          $lookup: {
            from: 'choices',
            localField: 'choice',
            foreignField: '_id',
            as: 'choice',
          },
        },
        {
          $unwind: {
            path: '$choice',
            includeArrayIndex: '0',
            preserveNullAndEmptyArrays: true,
          },
        },
        {
          $addFields: {
            choice: {
              $cond: [
                {
                  $in: ['$choice._id', '$product.choices'],
                },
                '$choice',
                null,
              ],
            },
          },
        },
        {
          $addFields: {
            total_price: {
              $multiply: [
                {
                  $cond: [
                    {
                      $eq: ['$choice', null],
                    },
                    '$product.price',
                    '$choice.price',
                  ],
                },
                '$amount',
              ],
            },
          },
        },
      ])
      .exec();
  }

  async addToCart(userId: Types.ObjectId, addToCartDto: AddToCartDto) {
    const productId = new Types.ObjectId(addToCartDto.product);
    const choiceId = addToCartDto.choice
      ? new Types.ObjectId(addToCartDto.choice)
      : null;

    const cart = new this.shoppingCartModel({
      user: userId,
      product: productId,
      choice: choiceId,
      amount: addToCartDto.amount,
      additional_info: addToCartDto.additional_info
        ? addToCartDto.additional_info
        : null,
    });
    await cart.save();
  }

  async updateIsOrdered(cartIds: Types.ObjectId[]) {
    await this.shoppingCartModel
      .updateMany({ _id: { $in: cartIds } }, { $set: { is_ordered: true } })
      .exec();
  }

  async updateCart(cartId: Types.ObjectId, updateToCartDto: UpdateToCartDto) {
    await this.shoppingCartModel
      .updateOne({ _id: cartId }, { $set: updateToCartDto })
      .exec();
  }

  async removeFromCart(cartId: Types.ObjectId) {
    await this.shoppingCartModel
      .updateOne({ _id: cartId }, { $set: { deleted_at: new Date() } })
      .exec();
  }
}
