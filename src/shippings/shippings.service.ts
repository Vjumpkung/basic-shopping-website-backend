import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ShippingCreateDto } from 'src/orders/dto/shipping.crate.dto';
import { shippingSchema } from 'src/schemas/shipping.schema';

@Injectable()
export class ShippingsService {
  constructor(
    @InjectModel('shipping')
    private readonly shippingModel: Model<shippingSchema>,
  ) {}

  async getAllShippings() {
    return await this.shippingModel.find().exec();
  }

  async createShipping(shippingCreateDto: ShippingCreateDto) {
    const shipping = new this.shippingModel(shippingCreateDto);
    return await shipping.save();
  }
}
