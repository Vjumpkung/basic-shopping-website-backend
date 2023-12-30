import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ChoicesService } from './choices.service';

@Controller('choices')
@ApiTags('choices')
export class ChoicesController {
  constructor(private readonly choicesService: ChoicesService) {}
}
