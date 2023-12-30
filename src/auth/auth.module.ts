import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersSchema } from 'src/schemas/users.schema';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
    }),
    MongooseModule.forFeature([{ name: 'users', schema: UsersSchema }]),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
