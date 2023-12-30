import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class SettingsUpdateDto {
  @IsString()
  @IsOptional()
  @ApiPropertyOptional({ description: 'name of the shop', type: String })
  name: string;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional({
    description: 'logo image url of the shop',
    type: String,
  })
  logo: string;
}
