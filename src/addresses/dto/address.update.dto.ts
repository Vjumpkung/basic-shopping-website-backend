import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class AddressUpdateDto {
  @ApiProperty({ type: String, description: 'title', required: false })
  @IsOptional()
  @IsString()
  title: string;

  @ApiProperty({ type: String, description: 'address', required: false })
  @IsOptional()
  @IsString()
  address: string;

  @ApiProperty({
    type: String,
    description: 'telephone number',
    required: false,
  })
  @IsOptional()
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
