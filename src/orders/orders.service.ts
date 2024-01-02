import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { OrderStatus } from 'src/enums/order.status';
import { orderSchema } from 'src/schemas/orders.schema';
import { CreateOrderDto } from './dto/order.create.dto';
import { ShippingCreateDto } from './dto/shipping.crate.dto';
import { ShippingsService } from 'src/shippings/shippings.service';

@Injectable()
export class OrdersService {
  constructor(
    @InjectModel('orders')
    private readonly ordersModel: Model<orderSchema>,
    private readonly shippingService: ShippingsService,
  ) {}

  async getOrders() {
    return await this.ordersModel.find({ deleted_at: null }).exec();
  }

  async getOrdersByUserId(id: Types.ObjectId) {
    return await this.ordersModel.find({ user: id, deleted_at: null }).exec();
  }

  async createOrder(createOrderDto: CreateOrderDto) {
    createOrderDto.user = new Types.ObjectId(createOrderDto.user);
    createOrderDto.shopping_cart = createOrderDto.shopping_cart.map(
      (item) => new Types.ObjectId(item),
    );
    const order = new this.ordersModel(createOrderDto);
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
    await this.ordersModel.updateOne(
      { _id: id },
      {
        $set: {
          status: OrderStatus.Cancelled,
          cancelled_at: new Date(),
          cancelled_reason: cancelled_reason,
        },
      },
    );
  }

  async deleteOrder(id: Types.ObjectId) {
    await this.ordersModel.updateOne(
      { _id: id },
      { $set: { deleted_at: new Date() } },
    );
  }
}
