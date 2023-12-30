import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';

@Controller()
@ApiTags('app')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/ping')
  @ApiOkResponse({ description: 'Pong!', type: String })
  getPing(): string {
    return this.appService.pong();
  }
}
