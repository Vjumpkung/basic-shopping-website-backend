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
import { JwtDecodePipe } from 'src/pipes/jwt.decode.pipe';
import { UserJwt } from 'src/auth/user.jwt';

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
  @ApiHeaders([
    { name: 'Authorization', description: 'Bearer token', required: false },
  ])
  @ApiNoContentResponse({ description: 'update user role to admin' })
  async updateUserRoleToAdmin(
    @Headers('Authorization') headers: string,
    @Param('id', new ParseMongoIdPipe()) id: Types.ObjectId,
  ) {
    const headers_id = (<UserJwt>new JwtDecodePipe().transform(headers)).id;

    if (id.toString() === headers_id) {
      throw new BadRequestException('You cannot update your own role');
    }

    await this.usersService.updateUserRoleToAdmin(id);
  }

  @Patch(':id/user')
  @Role(UserRole.Admin)
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiParam({ name: 'id', type: String })
  @ApiHeaders([
    { name: 'Authorization', description: 'Bearer token', required: false },
  ])
  @ApiNoContentResponse({ description: 'update user role to user' })
  async updateUserRoleToUser(
    @Headers('Authorization') headers: string,
    @Param('id', new ParseMongoIdPipe()) id: Types.ObjectId,
  ) {
    const headers_id = (<UserJwt>new JwtDecodePipe().transform(headers)).id;

    if (id.toString() === headers_id) {
      throw new BadRequestException('You cannot update your own role');
    }

    await this.usersService.updateUserRoleToUser(id);
  }

  @Delete(':id')
  @Role(UserRole.Admin)
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiParam({ name: 'id', type: String })
  @ApiHeaders([
    { name: 'Authorization', description: 'Bearer token', required: false },
  ])
  @ApiNoContentResponse({ description: 'delete user' })
  async deleteUser(
    @Headers('Authorization') headers: string,
    @Param('id', new ParseMongoIdPipe()) id: Types.ObjectId,
  ) {
    const headers_id = (<UserJwt>new JwtDecodePipe().transform(headers)).id;

    if (id.toString() === headers_id) {
      throw new BadRequestException('You cannot delete yourself');
    }

    await this.usersService.deleteUser(id);
  }
}
