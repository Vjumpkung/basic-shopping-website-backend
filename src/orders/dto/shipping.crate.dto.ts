import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class ShippingCreateDto {
  @ApiProperty({ type: String, description: 'shipping provider' })
  @IsString()
  provider: string;

  @ApiProperty({ type: String, description: 'shipping tracking number' })
  @IsString()
  tracking_number: string;

  @ApiProperty({
    type: String,
    description: 'shipping tracking url',
    required: false,
  })
  @IsOptional()
  @IsString()
  tracking_url: string;
}
