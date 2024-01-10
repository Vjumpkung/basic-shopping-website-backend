import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';
import { Types } from 'mongoose';

export class ProductCreateDto {
  @IsString()
  @ApiProperty({ type: String, description: 'Product name', required: true })
  name: string;

  @IsString()
  @ApiProperty({
    type: String,
    description: 'Product description',
    required: false,
  })
  description: string;

  @ApiProperty({
    type: String,
    description: 'Product choices',
    isArray: true,
    required: false,
  })
  choices: Types.ObjectId[];

  @ApiProperty({
    type: String,
    description: 'Product image',
    isArray: true,
    required: false,
  })
  image: string[];

  @IsOptional()
  @IsNumber()
  @ApiProperty({ type: Number, description: 'Product price', required: false })
  price: number;

  @ApiProperty({
    type: Date,
    description: 'Product published date',
    required: false,
  })
  published_at: Date;
}
