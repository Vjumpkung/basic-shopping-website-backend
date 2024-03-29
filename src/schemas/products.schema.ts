import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Types } from 'mongoose';
import { choiceSchema } from './choices.schema';

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
    description: 'product choices',
    isArray: true,
    default: [],
  })
  @Prop({ type: [Types.ObjectId], ref: 'choices' })
  choices: Types.ObjectId[] | choiceSchema[];

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

  @ApiProperty({ type: Boolean, description: 'product availability' })
  @Prop({ default: true })
  isAvailable: boolean;

  @ApiProperty({ type: Date, description: 'product published date' })
  @Prop({ default: null })
  published_at: Date;

  @ApiProperty({ type: Date, description: 'product deleted date' })
  @Prop({ default: null })
  deleted_at: Date;
}

export const ProductsSchema = SchemaFactory.createForClass(productSchema);
