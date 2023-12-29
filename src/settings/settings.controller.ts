import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Patch,
} from '@nestjs/common';
import { SettingsService } from './settings.service';
import {
  ApiBody,
  ApiNoContentResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { settingsSchema } from 'src/schemas/settings.schema';
import { SettingsUpdateDto } from './dto/settings.update.dto';

@Controller('settings')
@ApiTags('settings')
export class SettingsController {
  constructor(private readonly settingsService: SettingsService) {}

  @ApiOkResponse({ description: 'get settings', type: settingsSchema })
  @Get('/')
  async getSettings() {
    return await this.settingsService.getSettings();
  }

  @Patch('/')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiBody({ type: SettingsUpdateDto })
  @ApiNoContentResponse({ description: 'update settings' })
  async updateSettings(@Body() settings: SettingsUpdateDto) {
    await this.settingsService.updateSettings(settings);
  }
}
