import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CancelledOrderDto {
  @ApiProperty({ type: String, description: 'Order cancelled reason' })
  @IsString()
  cancelled_reason: string;
}
