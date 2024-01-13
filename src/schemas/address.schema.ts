import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Types } from 'mongoose';

@Schema({ collection: 'addresses' })
export class addressSchema {
  @ApiProperty({ type: String, description: 'address id' })
  _id: Types.ObjectId;

  @ApiProperty({ type: String, description: 'user id' })
  @Prop()
  user: Types.ObjectId;

  @ApiProperty({ type: String, description: 'title' })
  @Prop()
  title: string;

  @ApiProperty({ type: String, description: 'address' })
  @Prop()
  address: string;

  @ApiProperty({ type: String, description: 'telephone number' })
  @Prop()
  telephone: string;

  @ApiProperty({ type: Boolean, description: 'set as default address' })
  @Prop()
  default: boolean;

  @ApiProperty({ type: Date, description: 'address created date' })
  @Prop({ default: new Date(), auto: true })
  created_at: Date;

  @ApiProperty({ type: Date, description: 'address deleted date' })
  @Prop({ default: null })
  deleted_at: Date;
}

export const AddressSchema = SchemaFactory.createForClass(addressSchema);
