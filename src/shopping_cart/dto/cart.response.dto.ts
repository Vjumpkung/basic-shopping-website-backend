import { ApiProperty } from '@nestjs/swagger';
import { Types } from 'mongoose';
import { choiceSchema } from 'src/schemas/choices.schema';
import { productSchema } from 'src/schemas/products.schema';

export class CartResponseDto {
  @ApiProperty({ type: String, description: 'shopping cart id' })
  _id: Types.ObjectId;

  @ApiProperty({ type: String, description: 'user id' })
  user: Types.ObjectId;

  @ApiProperty({ type: productSchema, description: 'Product id' })
  product: productSchema;

  @ApiProperty({ type: choiceSchema, description: 'choice id' })
  choice: choiceSchema;

  @ApiProperty({ type: Number, description: 'amount' })
  amount: number;

  @ApiProperty({ type: Number, description: 'total price' })
  total_price: number;

  @ApiProperty({ type: Boolean, description: 'is ordered' })
  is_ordered: boolean;

  @ApiProperty({ type: Date, description: 'product cart removed' })
  deleted_at: Date;
}
