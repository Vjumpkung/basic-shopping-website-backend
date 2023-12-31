import { Controller } from '@nestjs/common';
import { SlipsService } from './slips.service';

@Controller('slips')
export class SlipsController {
  constructor(private readonly slipsService: SlipsService) {}
}
