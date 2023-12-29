import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Types } from 'mongoose';

@Schema({ collection: 'products' })
export class productSchema {
  @ApiProperty({ type: String, description: 'product id' })
  _id: Types.ObjectId;

  @ApiProperty({ type: String, description: 'product name' })
  @Prop()
  name: string;

  @ApiProperty({ type: String, description: 'product description' })
  @Prop()
  description: string;

  @ApiProperty({
    type: String,
    description: 'product category',
    isArray: true,
    default: [],
  })
  @Prop()
  choices: string[];

  @ApiProperty({
    type: String,
    description: 'product image',
    isArray: true,
    default: [],
  })
  @Prop()
  image: string[];

  @ApiProperty({ type: Number, description: 'product price' })
  @Prop()
  price: number;

  @ApiProperty({ type: Date, description: 'product published date' })
  @Prop({ default: null })
  published_at: Date;

  @ApiProperty({ type: Date, description: 'product deleted date' })
  @Prop({ default: null })
  deleted_at: Date;
}

export const ProductsSchema = SchemaFactory.createForClass(productSchema);
