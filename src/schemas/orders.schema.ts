import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Types } from 'mongoose';
import { OrderStatus } from 'src/enums/order.status';

@Schema({ collection: 'orders' })
export class orderSchema {
  @ApiProperty({ type: String, description: 'order id' })
  _id: Types.ObjectId;

  @ApiProperty({ type: String, description: 'user id' })
  @Prop()
  user: Types.ObjectId;

  @ApiProperty({
    type: String,
    isArray: true,
    description: 'array of shopping cart id',
  })
  @Prop()
  shopping_cart: Types.ObjectId[];

  @ApiProperty({ type: String, enum: OrderStatus, description: 'Order status' })
  @Prop({ default: OrderStatus.MustBePaid })
  status: OrderStatus;

  @ApiProperty({ type: String, description: 'shipping id' })
  @Prop({ default: null })
  shipping: Types.ObjectId;

  @ApiProperty({ type: Date, description: 'order cancelled date' })
  @Prop({ default: null })
  cancelled_at: Date;

  @ApiProperty({ type: String, description: 'cancelled reason' })
  @Prop({ default: null })
  cancelled_reason: string;

  @ApiProperty({ type: Date, description: 'order deleted date' })
  @Prop({ default: null })
  deleted_at: Date;
}

export const OrdersSchema = SchemaFactory.createForClass(orderSchema);
