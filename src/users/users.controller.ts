import {
  BadRequestException,
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
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiBody,
  ApiNoContentResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { Types } from 'mongoose';
import { AuthGuard } from 'src/auth/auth.guard';
import { UserJwt } from 'src/auth/user.jwt';
import { AuthUser } from 'src/decorators/authuser.decorator';
import { Role } from 'src/decorators/user.role.decorator';
import { UserRole } from 'src/enums/user.role';
import { ParseMongoIdPipe } from 'src/pipes/mongo.objectid.pipe';
import { ErrorDto } from './dto/error.dto';
import { UserCreateDto } from './dto/user.create.dto';
import { UserResponseDto } from './dto/user.response.dto';
import { UpdateInfoDto } from './dto/user.update.info.dto';
import { UsersService } from './users.service';

@UseGuards(AuthGuard)
@ApiBearerAuth()
@Controller('users')
@ApiTags('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @Role(UserRole.Admin)
  @ApiOperation({ summary: 'Require ADMIN' })
  @ApiOkResponse({
    description: 'get users',
    type: UserResponseDto,
    isArray: true,
  })
  async getUsers() {
    return await this.usersService.findAll();
  }

  @Post()
  @Role(UserRole.Admin)
  @ApiOperation({ summary: 'Require ADMIN' })
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiNoContentResponse({ description: 'create user' })
  async createUser(@Body() userCreateDto: UserCreateDto) {
    await this.usersService.createUser(userCreateDto);
  }

  @Patch(':id')
  @Role(UserRole.User)
  @ApiOperation({ summary: 'Require USER' })
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiParam({ name: 'id', type: String })
  @ApiBody({ type: UpdateInfoDto })
  @ApiNoContentResponse({ description: 'update user info' })
  @ApiBadRequestResponse({
    type: ErrorDto,
  })
  async updateUserInfo(
    @Param('id', new ParseMongoIdPipe()) _id: Types.ObjectId,
    @Body() updateInfo: UpdateInfoDto,
  ) {
    await this.usersService.updateUserInfo(_id, updateInfo);
  }

  @Patch(':id/admin')
  @Role(UserRole.Admin)
  @ApiOperation({ summary: 'Require ADMIN' })
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiParam({ name: 'id', type: String })
  @ApiNoContentResponse({ description: 'update user role to admin' })
  async updateUserRoleToAdmin(
    @AuthUser() { id }: UserJwt,
    @Param('id', new ParseMongoIdPipe()) _id: Types.ObjectId,
  ) {
    if (_id.toString() === id) {
      throw new BadRequestException('You cannot update your own role');
    }

    await this.usersService.updateUserRoleToAdmin(_id);
  }

  @Patch(':id/user')
  @Role(UserRole.Admin)
  @ApiOperation({ summary: 'Require ADMIN' })
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiParam({ name: 'id', type: String })
  @ApiNoContentResponse({ description: 'update user role to user' })
  async updateUserRoleToUser(
    @AuthUser() { id }: UserJwt,
    @Param('id', new ParseMongoIdPipe()) _id: Types.ObjectId,
  ) {
    if (_id.toString() === id) {
      throw new BadRequestException('You cannot update your own role');
    }

    await this.usersService.updateUserRoleToUser(_id);
  }

  @Delete(':id')
  @Role(UserRole.Admin)
  @ApiOperation({ summary: 'Require ADMIN' })
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiParam({ name: 'id', type: String })
  @ApiNoContentResponse({ description: 'delete user' })
  async deleteUser(
    @AuthUser() { id }: UserJwt,
    @Param('id', new ParseMongoIdPipe()) _id: Types.ObjectId,
  ) {
    if (_id.toString() === id) {
      throw new BadRequestException('You cannot delete yourself');
    }

    await this.usersService.deleteUser(_id);
  }
}
