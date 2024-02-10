import { ApiProperty } from '@nestjs/swagger';
import { Types } from 'mongoose';
import { OrderStatus } from 'src/enums/order.status';
import { addressSchema } from 'src/schemas/address.schema';
import { shippingSchema } from 'src/schemas/shipping.schema';
import { userSchema } from 'src/schemas/users.schema';
import { CartResponseDto } from 'src/shopping_cart/dto/cart.response.dto';
import { UserResponseDto } from 'src/users/dto/user.response.dto';

export class OrdersAllResponseDto {
  @ApiProperty({ type: String, description: 'order id' })
  _id: Types.ObjectId;

  @ApiProperty({ type: UserResponseDto, description: 'user id' })
  user: UserResponseDto;

  @ApiProperty({ type: addressSchema, description: 'address' })
  address: addressSchema;

  @ApiProperty({ type: String, description: 'additional info' })
  additional_info: string;

  @ApiProperty({
    type: CartResponseDto,
    isArray: true,
    description: 'array of shopping cart id',
  })
  shopping_cart: CartResponseDto[];

  @ApiProperty({ type: Number, description: 'total price' })
  total_price: number;

  @ApiProperty({ type: String, enum: OrderStatus, description: 'Order status' })
  status: OrderStatus;

  @ApiProperty({
    type: shippingSchema,
    description: 'shipping id',
    nullable: true,
  })
  shipping: shippingSchema;

  @ApiProperty({
    type: Date,
    description: 'order created date',
  })
  created_at: Date;

  @ApiProperty({
    type: Date,
    description: 'order cancelled date',
    nullable: true,
  })
  cancelled_at: Date;

  @ApiProperty({
    type: String,
    description: 'cancelled reason',
    nullable: true,
  })
  cancelled_reason: string;

  @ApiProperty({
    type: Date,
    description: 'order deleted date',
    nullable: true,
  })
  deleted_at: Date;
}
