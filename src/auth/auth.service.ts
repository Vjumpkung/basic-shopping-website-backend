import { userSchema } from 'src/schemas/users.schema';
import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { RegisterDto } from './dto/register.dto';
import * as bcrypt from 'bcrypt';
import { RegisterResponseDto } from './dto/register.response.dto';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import { LoginResponseDto } from './dto/login.response.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel('users')
    private readonly usersModel: Model<userSchema>,
    private readonly jwtService: JwtService,
  ) {}

  async resgister(registerDto: RegisterDto): Promise<RegisterResponseDto> {
    if (
      await this.usersModel.findOne({ username: registerDto.username }).exec()
    ) {
      throw new BadRequestException('Username already used');
    }
    const hash = await bcrypt.hash(registerDto.password, 10);
    const user = await this.usersModel.create({
      username: registerDto.username,
      password: hash,
    });
    await user.save();

    const response = new RegisterResponseDto();
    response._id = user._id;
    response.username = user.username;
    response.role = user.role;

    return response;
  }

  async login(loginDto: LoginDto): Promise<LoginResponseDto> {
    const user = await this.usersModel
      .findOne({ username: loginDto.username })
      .exec();
    if (!user) {
      throw new UnauthorizedException('Invalid username or password');
    }

    const match = await bcrypt.compare(loginDto.password, user.password);
    if (!match) {
      throw new UnauthorizedException('Invalid username or password');
    }

    const res = new LoginResponseDto();

    res.access_token = await this.jwtService.signAsync({
      id: user._id,
      username: user.username,
      role: user.role,
    });

    return res;
  }

  async getProfile() {}
}
