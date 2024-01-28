import { ApiProperty } from '@nestjs/swagger';

export class ErrorDto {
  @ApiProperty({ description: 'error message' })
  message: string;
}
