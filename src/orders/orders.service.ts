import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { orderSchema } from 'src/schemas/orders.schema';

@Injectable()
export class OrdersService {
  constructor(
    @InjectModel('orders')
    private readonly ordersModel: Model<orderSchema>,
  ) {}
}
