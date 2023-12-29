import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Types } from 'mongoose';

@Schema({ collection: 'shopping_cart' })
export class shoppingSchema {
  @ApiProperty({ type: String, description: 'shopping cart id' })
  _id: Types.ObjectId;

  @ApiProperty({ type: String, description: 'Product id' })
  @Prop()
  product: Types.ObjectId;

  @ApiProperty({ type: String, description: 'choice id' })
  @Prop()
  choice: Types.ObjectId;

  @ApiProperty({ type: Number, description: 'amount' })
  @Prop()
  amount: number;

  @ApiProperty({ type: Number, description: 'total price' })
  @Prop()
  total_price: number;
}

export const ShoppingCartSchema = SchemaFactory.createForClass(shoppingSchema);
