import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class AddressCreateDto {
  @ApiProperty({ type: String, description: 'title', required: true })
  @IsString()
  title: string;

  @ApiProperty({ type: String, description: 'address', required: true })
  @IsString()
  address: string;

  @ApiProperty({
    type: String,
    description: 'telephone number',
    required: true,
  })
  @IsString()
  telephone: string;

  @ApiProperty({
    type: Boolean,
    description: 'set as default address',
    required: false,
  })
  @IsOptional()
  default: boolean;
}
