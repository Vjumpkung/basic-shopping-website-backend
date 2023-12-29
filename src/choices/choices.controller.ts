import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@Controller('choices')
@ApiTags('choices')
export class ChoicesController {}
