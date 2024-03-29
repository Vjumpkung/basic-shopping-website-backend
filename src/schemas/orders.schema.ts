import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Types } from 'mongoose';
import { OrderStatus } from 'src/enums/order.status';
import { CartResponseDto } from 'src/shopping_cart/dto/cart.response.dto';
import { shippingSchema } from './shipping.schema';
import { addressSchema } from './address.schema';

@Schema({ collection: 'orders' })
export class orderSchema {
  @ApiProperty({ type: String, description: 'order id' })
  _id: Types.ObjectId;

  @ApiProperty({ type: String, description: 'user id' })
  @Prop({ ref: 'users', type: Types.ObjectId })
  user: Types.ObjectId;

  @ApiProperty({ type: addressSchema, description: 'address id' })
  @Prop({ ref: 'addresses', type: addressSchema })
  address: addressSchema;

  @ApiProperty({
    type: CartResponseDto,
    isArray: true,
    description: 'array of shopping cart id',
  })
  @Prop()
  shopping_cart: CartResponseDto[];

  @ApiProperty({ type: Number, description: 'total price' })
  @Prop({ default: 0 })
  total_price: number;

  @ApiProperty({ type: String, enum: OrderStatus, description: 'Order status' })
  @Prop({ default: OrderStatus.MustBePaid })
  status: OrderStatus;

  @ApiProperty({ type: String, description: 'additional info' })
  @Prop({ type: String, required: false, default: '' })
  additional_info: string;

  @ApiProperty({
    type: shippingSchema,
    description: 'shipping id',
    nullable: true,
  })
  @Prop({ default: null, ref: 'shipping', type: Types.ObjectId })
  shipping: shippingSchema | Types.ObjectId;

  @ApiProperty({
    type: Date,
    description: 'order created date',
  })
  @Prop({ default: new Date(), auto: true })
  created_at: Date;

  @ApiProperty({
    type: Date,
    description: 'order cancelled date',
    nullable: true,
  })
  @Prop({ default: null })
  cancelled_at: Date;

  @ApiProperty({
    type: String,
    description: 'cancelled reason',
    nullable: true,
  })
  @Prop({ default: null })
  cancelled_reason: string;

  @ApiProperty({
    type: Date,
    description: 'order deleted date',
    nullable: true,
  })
  @Prop({ default: null })
  deleted_at: Date;
}

export const OrdersSchema = SchemaFactory.createForClass(orderSchema);
