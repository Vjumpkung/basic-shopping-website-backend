import { ApiProperty } from '@nestjs/swagger';
import { Types } from 'mongoose';
import { choiceSchema } from 'src/schemas/choices.schema';

export class ProductsAllResponseDto {
  @ApiProperty({ type: String, description: 'product id' })
  _id: Types.ObjectId;

  @ApiProperty({ type: String, description: 'product name' })
  name: string;

  @ApiProperty({
    type: choiceSchema,
    description: 'choices of product',
    isArray: true,
    default: [],
  })
  choices: choiceSchema[];

  @ApiProperty({
    type: String,
    description: 'product image',
    isArray: true,
    default: [],
  })
  image: string[];

  @ApiProperty({ type: Number, description: 'product price' })
  price: number;

  @ApiProperty({ type: Boolean, description: 'product availability' })
  isAvailable: boolean;

  @ApiProperty({ type: Date, description: 'product published date' })
  published_at: Date;

  @ApiProperty({ type: Date, description: 'product deleted date' })
  deleted_at: Date;
}
