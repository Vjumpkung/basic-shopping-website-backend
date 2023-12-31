import { ApiProperty } from '@nestjs/swagger';
import { jwtDecode } from 'jwt-decode';
import { Types } from 'mongoose';
import { UserRole } from 'src/enums/user.role';

export class ProfileResponseDto {
  @ApiProperty({ type: String, description: 'id' })
  _id: Types.ObjectId;

  @ApiProperty({ type: String, description: 'username' })
  username: string;

  @ApiProperty({ type: Number, enum: UserRole, description: 'role' })
  role: UserRole;

  static fromUser(user: any) {
    const dto = new ProfileResponseDto();
    Object.assign(dto, jwtDecode(user));
    return dto;
  }
}
