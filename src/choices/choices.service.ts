import { choiceSchema } from './../schemas/choices.schema';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class ChoicesService {
  constructor(
    @InjectModel('choices')
    private readonly choicesModel: Model<choiceSchema>,
  ) {}
}
