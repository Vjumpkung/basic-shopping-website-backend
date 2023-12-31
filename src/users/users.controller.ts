import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Headers,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiHeaders,
  ApiNoContentResponse,
  ApiOkResponse,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/auth.guard';
import { Role } from 'src/decorators/user.role.decorator';
import { UserRole } from 'src/enums/user.role';
import { UsersService } from './users.service';
import { userSchema } from 'src/schemas/users.schema';
import { UserCreateDto } from './dto/user.create.dto';
import { ParseMongoIdPipe } from 'src/pipes/mongo.objectid.pipe';
import { Types } from 'mongoose';
import { UserJwt } from 'src/auth/user.jwt';
import { AuthUser } from 'src/decorators/authuser.decorator';

@UseGuards(AuthGuard)
@ApiBearerAuth()
@Controller('users')
@ApiTags('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @Role(UserRole.Admin)
  @ApiOkResponse({ description: 'get users', type: userSchema, isArray: true })
  async getUsers() {
    return await this.usersService.findAll();
  }

  @Post()
  @Role(UserRole.Admin)
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiNoContentResponse({ description: 'create user' })
  async createUser(@Body() userCreateDto: UserCreateDto) {
    await this.usersService.createUser(userCreateDto);
  }

  @Patch(':id/admin')
  @Role(UserRole.Admin)
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
