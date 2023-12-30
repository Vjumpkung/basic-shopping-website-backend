import { ApiProperty } from '@nestjs/swagger';
import { IsAlphanumeric, IsString } from 'class-validator';

export class UserCreateDto {
  @ApiProperty({ type: String, description: 'Username' })
  @IsString()
  @IsAlphanumeric()
  username: string;

  @ApiProperty({ type: String, description: 'Password' })
  @IsString()
  password: string;
}
