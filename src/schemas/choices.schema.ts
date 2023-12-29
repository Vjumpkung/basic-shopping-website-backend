import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Types } from 'mongoose';

@Schema({ collection: 'choices' })
export class choiceSchema {
  @ApiProperty({ type: String, description: 'choice id' })
  _id: Types.ObjectId;

  @ApiProperty({ type: String, description: 'choice name' })
  @Prop()
  name: string;

  @ApiProperty({ type: Number, description: 'choice price' })
  @Prop()
  price: number;
}

export const ChoicesSchema = SchemaFactory.createForClass(choiceSchema);
