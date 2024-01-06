import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId, IsNumber, IsOptional } from 'class-validator';
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
}
