import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Types } from 'mongoose';

@Schema({ collection: 'shipping' })
export class shippingSchema {
  @ApiProperty({ type: String, description: 'shipping id' })
  _id: Types.ObjectId;

  @ApiProperty({ type: String, description: 'shipping provider' })
  @Prop()
  provider: string;

  @ApiProperty({ type: String, description: 'shipping tracking number' })
  @Prop()
  tracking_number: string;

  @ApiProperty({ type: String, description: 'shipping tracking url' })
  @Prop()
  tracking_url: string;
}

export const ShippingSchema = SchemaFactory.createForClass(shippingSchema);
