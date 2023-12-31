import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { shoppingSchema } from 'src/schemas/shopping_cart.schema';

@Injectable()
export class SlipsService {
  constructor(private readonly shoppingCartModel: Model<shoppingSchema>) {}
}
