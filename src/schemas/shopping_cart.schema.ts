import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty, ApiQuery } from '@nestjs/swagger';
import { Types } from 'mongoose';

@Schema({ collection: 'shopping_cart' })
export class shoppingSchema {
  @ApiProperty({ type: String, description: 'shopping cart id' })
  _id: Types.ObjectId;

  @ApiProperty({ type: String, description: 'user id' })
  @Prop()
  user: Types.ObjectId;

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

  @ApiProperty({ type: Boolean, description: 'is ordered' })
  @Prop({ default: false })
  is_ordered: boolean;
}

export const ShoppingCartSchema = SchemaFactory.createForClass(shoppingSchema);
