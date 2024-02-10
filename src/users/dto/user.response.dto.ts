import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Types } from 'mongoose';
import { UserRole } from 'src/enums/user.role';

export class UserResponseDto {
  @ApiProperty({ type: String, description: 'user id' })
  _id: Types.ObjectId;

  @ApiProperty({ type: String, description: 'username' })
  username: string;

  @ApiProperty({ type: Number, enum: UserRole, description: 'user role' })
  role: UserRole;

  @ApiProperty({ type: Date, description: 'user created at' })
  created_at: Date;

  @ApiProperty({ type: Date, description: 'user deleted date' })
  deleted_at: Date;
}
