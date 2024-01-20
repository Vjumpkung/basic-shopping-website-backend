import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { ChoicesService } from './choices.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { UserRole } from 'src/enums/user.role';
import { Role } from 'src/decorators/user.role.decorator';
import { CreateChoiceDto } from './dto/create.choice.dto';
import { choiceSchema } from 'src/schemas/choices.schema';
import { ParseMongoIdPipe } from 'src/pipes/mongo.objectid.pipe';
import { UpdateChoiceDto } from './dto/update.choice.dto';
import { Types } from 'mongoose';

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

  @ApiParam({ name: 'id', type: String })
  @ApiOkResponse({ description: 'Get choice by id', type: choiceSchema })
  @ApiOperation({ summary: 'Require ADMIN' })
  @Role(UserRole.Admin)
  @Get(':id')
  getChoiceById(@Param('id', new ParseMongoIdPipe()) id: Types.ObjectId) {
    return this.choicesService.getChoiceById(id);
  }

  @ApiCreatedResponse({ description: 'Create choices', type: choiceSchema })
  @ApiOperation({ summary: 'Require ADMIN' })
  @Role(UserRole.Admin)
  @Post()
  async createChoice(@Body() createChoiceDto: CreateChoiceDto) {
    return await this.choicesService.createChoice(createChoiceDto);
  }

  @ApiParam({ name: 'id', type: String })
  @ApiNoContentResponse({ description: 'Update choice' })
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Require ADMIN' })
  @Role(UserRole.Admin)
  @Patch(':id')
  updateChoice(
    @Param('id', new ParseMongoIdPipe()) id: Types.ObjectId,
    @Body() updateChoiceDto: UpdateChoiceDto,
  ) {
    this.choicesService.updateChoice(id, updateChoiceDto);
  }

  @ApiParam({ name: 'id', type: String })
  @ApiNoContentResponse({ description: 'Update choice' })
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Require ADMIN' })
  @Role(UserRole.Admin)
  @Delete(':id')
  deleteChoice(@Param('id', new ParseMongoIdPipe()) id: Types.ObjectId) {
    this.choicesService.deleteChoice(id);
  }
}
