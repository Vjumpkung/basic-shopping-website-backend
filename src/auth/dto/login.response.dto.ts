import { ApiProperty } from '@nestjs/swagger';

export class LoginResponseDto {
  @ApiProperty({ type: String, description: 'access_token' })
  access_token: string;
}
