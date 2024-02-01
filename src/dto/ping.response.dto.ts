import { ApiProperty } from '@nestjs/swagger';

export class PingResponseDto {
  @ApiProperty({ example: 'Pong!', type: String })
  msg: string;
}
