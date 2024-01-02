import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
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
import { UserRole } from 'src/enums/user.role';
import { Role } from 'src/decorators/user.role.decorator';
import { AuthGuard } from './auth.guard';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiBody({ type: RegisterDto })
  @ApiCreatedResponse({
    description: 'User registration',
    type: RegisterResponseDto,
  })
  @HttpCode(HttpStatus.CREATED)
  @Post('register')
  async register(@Body() registerDto: RegisterDto) {
    return await this.authService.resgister(registerDto);
  }

  @ApiOkResponse({ type: LoginResponseDto, description: 'User login' })
  @ApiBody({ type: LoginDto })
  @HttpCode(HttpStatus.OK)
  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    const token = await this.authService.login(loginDto);
    return token;
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Role(UserRole.User)
  @ApiOperation({ summary: 'Require USER' })
  @ApiOkResponse({ description: 'get profile', type: ProfileResponseDto })
  @HttpCode(HttpStatus.OK)
  @Get('profile')
  async getProfile(@AuthUser() me: UserJwt) {
    if (!me) {
      throw new UnauthorizedException();
    }
    return me;
  }
}
