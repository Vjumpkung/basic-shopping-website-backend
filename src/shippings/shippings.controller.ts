import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { ShippingsService } from './shippings.service';
import { Role } from 'src/decorators/user.role.decorator';
import { UserRole } from 'src/enums/user.role';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/auth.guard';
import { shippingSchema } from 'src/schemas/shipping.schema';

@ApiTags('shippings')
@Controller('shippings')
@UseGuards(AuthGuard)
@ApiBearerAuth()
export class ShippingsController {
  constructor(private readonly shippingsService: ShippingsService) {}

  @Role(UserRole.Admin)
  @ApiOkResponse({ type: shippingSchema, isArray: true })
  @HttpCode(HttpStatus.OK)
  @Get()
  async getAllShippings() {
    return await this.shippingsService.getAllShippings();
  }
}
