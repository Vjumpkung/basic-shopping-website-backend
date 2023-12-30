import { ExecutionContext, createParamDecorator } from '@nestjs/common';

export const AuthUser = createParamDecorator((_, ctx: ExecutionContext) => {
  const req = ctx.switchToHttp().getRequest();
  return req;
});
