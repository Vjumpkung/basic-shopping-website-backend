import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiNoContentResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { ChoicesService } from './choices.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { UserRole } from 'src/enums/user.role';
import { Role } from 'src/decorators/user.role.decorator';
import { CreateChoiceDto } from './dto/create.choice.dto';
import { choiceSchema } from 'src/schemas/choices.schema';

@UseGuards(AuthGuard)
@ApiBearerAuth()
@Controller('choices')
@ApiTags('choices')
export class ChoicesController {
  constructor(private readonly choicesService: ChoicesService) {}

  @ApiOkResponse({
    description: 'Get all choices',
    type: choiceSchema,
    isArray: true,
  })
  @ApiOperation({ summary: 'Require ADMIN' })
  @Role(UserRole.Admin)
  @Get()
  async getAllChoices() {
    return await this.choicesService.getAllChoices();
  }

  @ApiNoContentResponse({ description: 'Create choices' })
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Require ADMIN' })
  @Role(UserRole.Admin)
  @Post()
  async createChoice(@Body() createChoiceDto: CreateChoiceDto) {
    await this.choicesService.createChoice(createChoiceDto);
  }
}
