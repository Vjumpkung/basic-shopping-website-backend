import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { slipSchema } from 'src/schemas/slips.schema';
import { CreateSlipDto } from './dto/create.slip.dto';

@Injectable()
export class SlipsService {
  constructor(
    @InjectModel('slips')
    private readonly slipModel: Model<slipSchema>,
  ) {}

  async getSlips() {
    return await this.slipModel.find().exec();
  }

  async getSlipById(id: Types.ObjectId) {
    return await this.slipModel.find({ user: id }).exec();
  }

  async createSlip(userId: Types.ObjectId, createSlipDto: CreateSlipDto) {
    createSlipDto.orders = createSlipDto.orders.map(
      (order) => new Types.ObjectId(order),
    );
    const slip = new this.slipModel({ ...createSlipDto, user: userId });
    return await slip.save();
  }
}
