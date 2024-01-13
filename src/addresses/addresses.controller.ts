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
  ApiBody,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/auth.guard';
import { AddressesService } from './addresses.service';
import { Role } from 'src/decorators/user.role.decorator';
import { UserRole } from 'src/enums/user.role';
import { AuthUser } from 'src/decorators/authuser.decorator';
import { UserJwt } from 'src/auth/user.jwt';
import { Types } from 'mongoose';
import { addressSchema } from 'src/schemas/address.schema';
import { ParseMongoIdPipe } from 'src/pipes/mongo.objectid.pipe';
import { AddressCreateDto } from './dto/address.create.dto';
import { AddressUpdateDto } from './dto/address.update.dto';

@UseGuards(AuthGuard)
@ApiBearerAuth()
@ApiTags('addresses')
@Controller('addresses')
export class AddressesController {
  constructor(private readonly addressesService: AddressesService) {}

  @ApiOkResponse({
    description: 'Get addresses',
    type: addressSchema,
    isArray: true,
  })
  @ApiOperation({ summary: 'Requier USER' })
  @Role(UserRole.User)
  @Get()
  getAddresses(@AuthUser() { id }: UserJwt) {
    return this.addressesService.getAddresses(new Types.ObjectId(id));
  }

  @ApiOkResponse({
    description: 'Get addresses',
    type: addressSchema,
  })
  @ApiOperation({ summary: 'Requier USER' })
  @Role(UserRole.User)
  @Get('/default')
  getDefaultAddress(@AuthUser() { id }: UserJwt) {
    return this.addressesService.getDefaultAddress(new Types.ObjectId(id));
  }

  @ApiOkResponse({ type: addressSchema, description: 'Get address by id' })
  @ApiParam({ name: 'id', type: String, description: 'address id' })
  @ApiOperation({ summary: 'Requier USER' })
  @Role(UserRole.User)
  @Get(':id')
  getAddressById(@Param('id', new ParseMongoIdPipe()) id: Types.ObjectId) {
    return this.addressesService.getAddressById(id);
  }

  @ApiCreatedResponse({ type: addressSchema, description: 'address created' })
  @ApiBody({ type: AddressCreateDto })
  @ApiOperation({ summary: 'Requier USER' })
  @Role(UserRole.User)
  @Post()
  createAddress(
    @AuthUser() { id }: UserJwt,
    @Body() addressCreateDto: AddressCreateDto,
  ) {
    return this.addressesService.createAddress(
      new Types.ObjectId(id),
      addressCreateDto,
    );
  }

  @ApiNoContentResponse({ description: 'address updated' })
  @ApiBody({ type: AddressUpdateDto })
  @ApiParam({ name: 'id', type: String, description: 'address id' })
  @ApiOperation({ summary: 'Requier USER' })
  @Role(UserRole.User)
  @HttpCode(HttpStatus.NO_CONTENT)
  @Patch(':id')
  async updateAddress(
    @AuthUser() { id }: UserJwt,
    @Param('id', new ParseMongoIdPipe()) _id: Types.ObjectId,
    @Body() addressUpdateDto: AddressUpdateDto,
  ) {
    await this.addressesService.updateAddress(
      new Types.ObjectId(id),
      _id,
      addressUpdateDto,
    );
  }

  @ApiNoContentResponse({ description: 'address deleted' })
  @ApiParam({ name: 'id', type: String, description: 'address id' })
  @ApiOperation({ summary: 'Requier USER' })
  @Role(UserRole.User)
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  deleteAddress(@Param('id', new ParseMongoIdPipe()) id: Types.ObjectId) {
    this.addressesService.deleteAddress(id);
  }
}
