import { Injectable, UnauthorizedException } from '@nestjs/common';
import { jwtDecode } from 'jwt-decode';
import { UserJwt } from 'src/auth/user.jwt';

@Injectable()
export class JwtDecodePipe {
  transform(value: any) {
    try {
      const [type, token] = value?.split(' ') ?? [];
      if (type !== 'Bearer' || !token) throw new UnauthorizedException();
      return jwtDecode<UserJwt>(token);
    } catch (error) {
      return new UnauthorizedException();
    }
  }
}
