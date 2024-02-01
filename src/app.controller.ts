import { Controller, Get, Header } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { PingResponseDto } from './dto/ping.response.dto';

@Controller()
@ApiTags('app')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/ping')
  @ApiOkResponse({
    description: 'Pong!',
    type: PingResponseDto,
  })
  getPing() {
    return this.appService.pong();
  }
}
