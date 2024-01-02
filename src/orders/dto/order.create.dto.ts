import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsMongoId } from 'class-validator';
import { Types } from 'mongoose';

export class CreateOrderDto {
  @IsMongoId()
  @ApiProperty({ type: String, description: 'user id' })
  user: Types.ObjectId;

  @IsArray()
  @IsMongoId({ each: true })
  @ApiProperty({ type: String, description: 'shopping cart id', isArray: true })
  shopping_cart: Types.ObjectId[];
}
