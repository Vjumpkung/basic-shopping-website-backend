import { ApiProperty } from '@nestjs/swagger';

export class ProductsGetDto {
  @ApiProperty({ type: String, description: 'status' })
  status: string;
}
