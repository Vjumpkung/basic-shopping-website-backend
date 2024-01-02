import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { slipSchema } from 'src/schemas/slips.schema';

@Injectable()
export class SlipsService {
  constructor(
    @InjectModel('slips')
    private readonly slipModel: Model<slipSchema>,
  ) {}
}
