import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class ProductCreateDto {
  @IsString()
  @ApiProperty({ type: String, description: 'Product name' })
  name: string;

  @IsString()
  @ApiProperty({ type: String, description: 'Product description' })
  description: string;

  @ApiProperty({ type: String, description: 'Product choices', isArray: true })
  choices: string[];

  @ApiProperty({ type: String, description: 'Product image', isArray: true })
  image: string[];

  @IsNumber()
  @ApiProperty({ type: Number, description: 'Product price' })
  price: number;

  @ApiProperty({
    type: Date,
    description: 'Product published date',
    required: false,
  })
  published_at: Date;
}
