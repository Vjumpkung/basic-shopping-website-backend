import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import { SlipsService } from './slips.service';
import {
  ApiBearerAuth,
  ApiBody,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { slipSchema } from 'src/schemas/slips.schema';
import { CreateSlipDto } from './dto/create.slip.dto';
import { UserJwt } from 'src/auth/user.jwt';
import { AuthUser } from 'src/decorators/authuser.decorator';
import { Types } from 'mongoose';
import { AuthGuard } from 'src/auth/auth.guard';
import { UserRole } from 'src/enums/user.role';
import { Role } from 'src/decorators/user.role.decorator';

@ApiTags('slips')
@Controller('slips')
export class SlipsController {
  constructor(private readonly slipsService: SlipsService) {}

  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ type: slipSchema, isArray: true })
  @Role(UserRole.Admin)
  @ApiOperation({ summary: 'Require ADMIN' })
  @HttpCode(HttpStatus.OK)
  @Get()
  async getSlips() {
    return await this.slipsService.getSlips();
  }

  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ type: slipSchema, isArray: true })
  @Role(UserRole.User)
  @ApiOperation({ summary: 'Require USER' })
  @HttpCode(HttpStatus.OK)
  @Get(':id')
  async getSlipById(@AuthUser() { id }: UserJwt) {
    return await this.slipsService.getSlipById(new Types.ObjectId(id));
  }

  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @Role(UserRole.User)
  @ApiOperation({ summary: 'Require USER' })
  @ApiCreatedResponse({ type: slipSchema })
  @ApiBody({ type: CreateSlipDto })
  @HttpCode(HttpStatus.CREATED)
  @Post()
  async createSlip(
    @Body() createSlipDto: CreateSlipDto,
    @AuthUser() { id }: UserJwt,
  ) {
    return await this.slipsService.createSlip(
      new Types.ObjectId(id),
      createSlipDto,
    );
  }
}
