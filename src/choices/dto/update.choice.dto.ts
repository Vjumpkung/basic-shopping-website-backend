import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateChoiceDto {
  @IsOptional()
  @IsString()
  @ApiProperty({ type: String, description: 'choice name', required: false })
  name: string;

  @IsOptional()
  @IsNumber()
  @ApiProperty({ type: Number, description: 'choice price', required: false })
  price: number;
}
