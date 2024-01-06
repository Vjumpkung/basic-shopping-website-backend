import { choiceSchema } from './../schemas/choices.schema';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { CreateChoiceDto } from './dto/create.choice.dto';

@Injectable()
export class ChoicesService {
  constructor(
    @InjectModel('choices')
    private readonly choicesModel: Model<choiceSchema>,
  ) {}

  async getAllChoices() {
    return await this.choicesModel.find().exec();
  }

  async getChoiceById(id: Types.ObjectId) {
    return await this.choicesModel.findOne({ _id: id }).exec();
  }

  async createChoice(createChoiceDto: CreateChoiceDto) {
    const choice = await this.choicesModel.create(createChoiceDto);
    await choice.save();
  }
}
