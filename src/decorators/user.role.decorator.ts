import { Reflector } from '@nestjs/core';
import { UserRole } from 'src/enums/user.role';

export const Role = Reflector.createDecorator<UserRole>();
