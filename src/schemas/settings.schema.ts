import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Types } from 'mongoose';

@Schema({ collection: 'settings' })
export class settingsSchema {
  @ApiProperty({ type: String, description: 'settings id' })
  _id: Types.ObjectId;

  @ApiProperty({ type: String, description: 'shop name' })
  @Prop()
  name: string;

  @ApiProperty({ type: String, description: 'shop logo' })
  @Prop()
  logo: string;
}

export const SettingsSchema = SchemaFactory.createForClass(settingsSchema);
