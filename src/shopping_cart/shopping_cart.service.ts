import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { shoppingSchema } from 'src/schemas/shopping_cart.schema';

@Injectable()
export class ShoppingCartService {
  constructor(
    @InjectModel('shopping_cart')
    private readonly shoppingCartModel: Model<shoppingSchema>,
  ) {}
}
