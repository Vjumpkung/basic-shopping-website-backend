import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsMongoId, IsOptional, IsString } from 'class-validator';
import { Types } from 'mongoose';

export class CreateOrderDto {
  @IsArray()
  @IsMongoId({ each: true })
  @ApiProperty({ type: String, description: 'shopping cart id', isArray: true })
  shopping_cart: Types.ObjectId[];

  @IsOptional()
  @IsString()
  @ApiProperty({
    type: String,
    description: 'additional info',
    required: false,
  })
  additional_info: string;

  @IsMongoId()
  @ApiProperty({ type: String, description: 'address id', required: true })
  address: Types.ObjectId;
}
