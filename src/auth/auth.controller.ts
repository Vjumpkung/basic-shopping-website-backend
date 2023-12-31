import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  UnauthorizedException,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { RegisterDto } from './dto/register.dto';
import { AuthService } from './auth.service';
import { RegisterResponseDto } from './dto/register.response.dto';
import { LoginDto } from './dto/login.dto';
import { LoginResponseDto } from './dto/login.response.dto';
import { ProfileResponseDto } from './dto/profile.response.dto';
import { AuthUser } from 'src/decorators/authuser.decorator';
import { UserJwt } from './user.jwt';

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
  @Get('profile')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ description: 'get profile', type: ProfileResponseDto })
  async getProfile(@AuthUser() me: UserJwt) {
    if (!me) {
      throw new UnauthorizedException();
    }
    return me;
  }
}
