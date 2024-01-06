import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { OrderStatus } from 'src/enums/order.status';
import { orderSchema } from 'src/schemas/orders.schema';
import { CreateOrderDto } from './dto/order.create.dto';
import { ShippingCreateDto } from './dto/shipping.crate.dto';
import { ShippingsService } from 'src/shippings/shippings.service';
import { ShoppingCartService } from 'src/shopping_cart/shopping_cart.service';

@Injectable()
export class OrdersService {
  constructor(
    @InjectModel('orders')
    private readonly ordersModel: Model<orderSchema>,
    private readonly shippingService: ShippingsService,
    private readonly shoppingCartService: ShoppingCartService,
  ) {}

  async getOrders() {
    return await this.ordersModel
      .find({ deleted_at: null })
      .populate('shipping')
      .exec();
  }

  async getOrdersByUserId(id: Types.ObjectId) {
    return await this.ordersModel.find({ user: id, deleted_at: null }).exec();
  }

  async createOrder(userId: Types.ObjectId, createOrderDto: CreateOrderDto) {
    const copy_of_shopping_cart =
      await this.shoppingCartService.getCartByCartIds(
        createOrderDto.shopping_cart.map((item) => new Types.ObjectId(item)),
      );

    await this.shoppingCartService.updateIsOrdered(
      createOrderDto.shopping_cart,
    );

    const total_price = copy_of_shopping_cart.reduce(
      (acc, item) => acc + item.total_price,
      0,
    );

    const order = new this.ordersModel({
      user: userId,
      shopping_cart: copy_of_shopping_cart,
      total_price: total_price,
    });
    return await order.save();
  }

  async updateStatus(
    id: Types.ObjectId,
    status: OrderStatus,
    shipping?: ShippingCreateDto,
  ) {
    await this.ordersModel
      .updateOne({ _id: id }, { $set: { status: status } })
      .exec();
    if ((status = OrderStatus.MustBeReceived)) {
      const shipping_id = (await this.shippingService.createShipping(shipping))
        ._id;
      await this.ordersModel
        .updateOne({ _id: id }, { $set: { shipping: shipping_id } })
        .exec();
    }
  }

  async cancelledOrder(id: Types.ObjectId, cancelled_reason: string) {
    await this.ordersModel
      .updateOne(
        { _id: id },
        {
          $set: {
            status: OrderStatus.Cancelled,
            cancelled_at: new Date(),
            cancelled_reason: cancelled_reason,
          },
        },
      )
      .exec();
  }

  async editTracking(id: Types.ObjectId, shipping_id: Types.ObjectId) {
    await this.ordersModel
      .updateOne({ _id: id }, { $set: { shipping: shipping_id } })
      .exec();
  }

  async deleteOrder(id: Types.ObjectId) {
    await this.ordersModel
      .updateOne({ _id: id }, { $set: { deleted_at: new Date() } })
      .exec();
  }
}
