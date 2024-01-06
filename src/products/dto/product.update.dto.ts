import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';
import { Types } from 'mongoose';

export class ProductUpdateDto {
  @IsOptional()
  @ApiProperty({ type: String, description: 'Product name', required: false })
  name: string;

  @IsOptional()
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
  @ApiProperty({ type: Number, description: 'Product price', required: false })
  price: number;
}
