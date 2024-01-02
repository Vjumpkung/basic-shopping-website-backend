import { Controller } from '@nestjs/common';
import { ShippingsService } from './shippings.service';

@Controller('shippings')
export class ShippingsController {
  constructor(private readonly shippingsService: ShippingsService) {}
}
