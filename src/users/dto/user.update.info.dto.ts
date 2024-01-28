import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsAlphanumeric, IsOptional, IsString } from 'class-validator';

export class UpdateInfoDto {
  @ApiPropertyOptional({ type: String, description: 'New Username' })
  @IsString()
  @IsOptional()
  @IsAlphanumeric()
  newUsername?: string;

  @ApiProperty({ type: String, description: 'Old Password' })
  @IsString()
  oldPassword: string;

  @ApiPropertyOptional({ type: String, description: 'New Password' })
  @IsOptional()
  @IsString()
  newPassword?: string;
}
