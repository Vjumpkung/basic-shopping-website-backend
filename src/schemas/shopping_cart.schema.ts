import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Types } from 'mongoose';
import { choiceSchema } from './choices.schema';
import { productSchema } from './products.schema';

@Schema({ collection: 'shopping_cart' })
export class shoppingSchema {
  @ApiProperty({ type: String, description: 'shopping cart id' })
  _id: Types.ObjectId;

  @ApiProperty({ type: String, description: 'user id' })
  @Prop()
  user: Types.ObjectId;

  @ApiProperty({ type: productSchema, description: 'Product id' })
  @Prop({ type: Types.ObjectId, ref: 'products' })
  product: productSchema | Types.ObjectId;

  @ApiProperty({ type: choiceSchema, description: 'choice id', nullable: true })
  @Prop({
    required: false,
    default: null,
    type: Types.ObjectId,
    ref: 'choices',
  })
  choice: choiceSchema | Types.ObjectId;

  @ApiProperty({ type: String, description: 'additional info' })
  @Prop({ type: String, required: false, default: null })
  additional_info: string;

  @ApiProperty({ type: Number, description: 'amount' })
  @Prop()
  amount: number;

  @ApiProperty({ type: Boolean, description: 'is ordered' })
  @Prop({ default: false })
  is_ordered: boolean;

  @ApiProperty({
    type: Date,
    description: 'product cart removed',
    nullable: true,
  })
  @Prop({ default: null })
  deleted_at: Date;
}

export const ShoppingCartSchema = SchemaFactory.createForClass(shoppingSchema);
