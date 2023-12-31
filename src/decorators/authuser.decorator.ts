import {
  ExecutionContext,
  UnauthorizedException,
  createParamDecorator,
} from '@nestjs/common';
import { jwtDecode } from 'jwt-decode';

export const AuthUser = createParamDecorator((_, ctx: ExecutionContext) => {
  const req = ctx.switchToHttp().getRequest();
  const [type, token] = req.headers.authorization?.split(' ') ?? [];

  if (type === 'Bearer' ? token : undefined) {
    return jwtDecode(token);
  } else {
    throw new UnauthorizedException();
  }
});
