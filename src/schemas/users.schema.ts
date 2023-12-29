import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Types } from 'mongoose';
import { UserRole } from 'src/enums/user.role';

@Schema({ collection: 'users' })
export class userSchema {
  @ApiProperty({ type: String, description: 'user id' })
  _id: Types.ObjectId;

  @ApiProperty({ type: String, description: 'username' })
  @Prop()
  username: string;

  @ApiProperty({ type: String, description: 'password' })
  @Prop()
  password: string;

  @ApiProperty({ type: Number, enum: UserRole, description: 'user role' })
  @Prop({ default: UserRole.User })
  role: UserRole;

  @ApiProperty({ type: Date, description: 'user created at' })
  @Prop({ default: new Date() })
  created_at: Date;

  @ApiProperty({ type: Date, description: 'user deleted date' })
  @Prop({ default: null })
  deleted_at: Date;
}

export const UsersSchema = SchemaFactory.createForClass(userSchema);
