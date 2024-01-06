import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId, IsNumber, IsOptional } from 'class-validator';
import { Types } from 'mongoose';

export class UpdateToCartDto {
  @IsOptional()
  @IsMongoId()
  @ApiProperty({
    type: String,
    description: 'Product choice ID',
    required: false,
  })
  choice: Types.ObjectId;

  @IsOptional()
  @IsNumber()
  @ApiProperty({
    type: Number,
    description: 'Amount of product',
    required: false,
  })
  amount: number;
}
