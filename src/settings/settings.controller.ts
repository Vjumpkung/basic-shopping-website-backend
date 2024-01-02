import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Patch,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { SettingsService } from './settings.service';
import {
  ApiBearerAuth,
  ApiBody,
  ApiNoContentResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { settingsSchema } from 'src/schemas/settings.schema';
import { SettingsUpdateDto } from './dto/settings.update.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { Role } from 'src/decorators/user.role.decorator';
import { UserRole } from 'src/enums/user.role';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('settings')
@ApiTags('settings')
export class SettingsController {
  constructor(private readonly settingsService: SettingsService) {}

  @ApiOkResponse({ description: 'get settings', type: settingsSchema })
  @Get()
  async getSettings() {
    return await this.settingsService.getSettings();
  }

  @UseGuards(AuthGuard)
  @Role(UserRole.Admin)
  @ApiOperation({ summary: 'Require ADMIN' })
  @ApiBearerAuth()
  @Patch()
  @UseInterceptors(FileInterceptor('logo'))
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiBody({
    type: SettingsUpdateDto,
  })
  @ApiNoContentResponse({ description: 'update settings' })
  async updateSettings(@Body() settings: SettingsUpdateDto) {
    await this.settingsService.updateSettings(settings);
  }
}
