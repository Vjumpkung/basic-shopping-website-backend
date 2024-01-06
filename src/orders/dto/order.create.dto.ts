import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsMongoId } from 'class-validator';
import { Types } from 'mongoose';

export class CreateOrderDto {
  @IsArray()
  @IsMongoId({ each: true })
  @ApiProperty({ type: String, description: 'shopping cart id', isArray: true })
  shopping_cart: Types.ObjectId[];
}
