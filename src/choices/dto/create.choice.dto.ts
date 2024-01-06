import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class CreateChoiceDto {
  @IsString()
  @ApiProperty({ type: String, description: 'choice name' })
  name: string;

  @IsNumber()
  @ApiProperty({ type: Number, description: 'choice price' })
  price: number;
}
