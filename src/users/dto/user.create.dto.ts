import { ApiProperty } from '@nestjs/swagger';
import { IsAlphanumeric, IsEnum, IsString } from 'class-validator';
import { UserRole } from 'src/enums/user.role';

export class UserCreateDto {
  @ApiProperty({ type: String, description: 'Username' })
  @IsString()
  @IsAlphanumeric()
  username: string;

  @ApiProperty({ type: String, description: 'Password' })
  @IsString()
  password: string;

  @ApiProperty({ type: Number, description: 'Role' })
  @IsEnum(UserRole)
  role: number;
}
