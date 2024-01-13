import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId, IsNumber, IsOptional, IsString } from 'class-validator';
import { Types } from 'mongoose';

export class AddToCartDto {
  @IsMongoId()
  @ApiProperty({ type: String, description: 'Product ID' })
  product: Types.ObjectId;

  @IsOptional()
  @IsMongoId()
  @ApiProperty({
    type: String,
    description: 'Product choice ID',
    required: false,
  })
  choice: Types.ObjectId;

  @IsNumber()
  @ApiProperty({ type: Number, description: 'Amount of product' })
  amount: number;

  @IsOptional()
  @IsString()
  @ApiProperty({
    type: String,
    description: 'additional info',
    required: false,
  })
  additional_info: string;
}
