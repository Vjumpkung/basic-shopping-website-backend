import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Types } from 'mongoose';

@Schema({ collection: 'slips' })
export class slipSchema {
  @ApiProperty({ type: String, description: 'slip id' })
  _id: Types.ObjectId;

  @ApiProperty({ type: String, description: 'orders id' })
  @Prop()
  orders: Types.ObjectId[];

  @ApiProperty({ type: String, description: 'user id' })
  @Prop()
  user: Types.ObjectId;

  @ApiProperty({ type: String, description: 'transfer slip image' })
  @Prop()
  image: string;

  @ApiProperty({ type: String, description: 'additional info' })
  @Prop()
  additional_info: string;

  @ApiProperty({ type: Date, description: 'transfer date' })
  @Prop()
  transfer_date: Date;
}

export const SlipsSchema = SchemaFactory.createForClass(slipSchema);
