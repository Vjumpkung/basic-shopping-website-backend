import { ApiProperty } from '@nestjs/swagger';
import { Types } from 'mongoose';
import { UserRole } from 'src/enums/user.role';

export class RegisterResponseDto {
  @ApiProperty({ type: String, description: 'id' })
  _id: Types.ObjectId;

  @ApiProperty({ type: String, description: 'username' })
  username: string;

  @ApiProperty({ type: Number, enum: UserRole, description: 'role' })
  role: UserRole;
}
