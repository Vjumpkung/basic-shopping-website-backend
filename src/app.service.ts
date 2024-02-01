import { Injectable } from '@nestjs/common';
import { PingResponseDto } from './dto/ping.response.dto';

@Injectable()
export class AppService {
  pong(): PingResponseDto {
    return { msg: 'Pong!' };
  }
}
