import {
  Body,
  Controller,
  Get,
  Headers,
  HttpCode,
  HttpStatus,
  Post,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiCreatedResponse,
  ApiHeaders,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { RegisterDto } from './dto/register.dto';
import { AuthService } from './auth.service';
import { RegisterResponseDto } from './dto/register.response.dto';
import { LoginDto } from './dto/login.dto';
import { LoginResponseDto } from './dto/login.response.dto';
import { JwtDecodePipe } from 'src/pipes/jwt.decode.pipe';
import { ProfileResponseDto } from './dto/profile.response.dto';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(HttpStatus.CREATED)
  @ApiBody({ type: RegisterDto })
  @ApiCreatedResponse({
    description: 'User registration',
    type: RegisterResponseDto,
  })
  @Post('register')
  async register(@Body() registerDto: RegisterDto) {
    return await this.authService.resgister(registerDto);
  }

  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ type: LoginResponseDto, description: 'User login' })
  @ApiBody({ type: LoginDto })
  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    const token = await this.authService.login(loginDto);
    return token;
  }

  @ApiBearerAuth()
  @ApiHeaders([
    { name: 'Authorization', description: 'Bearer token', required: false },
  ])
  @Get('profile')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ description: 'get profile', type: ProfileResponseDto })
  async getProfile(@Headers('Authorization') headers: string) {
    return new JwtDecodePipe().transform(headers);
  }
}
