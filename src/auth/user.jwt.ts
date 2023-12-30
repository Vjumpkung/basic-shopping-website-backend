import { UserRole } from 'src/enums/user.role';

export class UserJwt {
  id: string;

  username: string;

  role: UserRole;

  constructor(base: Partial<UserJwt>) {
    this.id = base.id;
    this.username = base.username;
    this.role = base.role;
  }

  static fromUser(user: any): UserJwt {
    return new UserJwt({
      id: user._id,
      username: user.username,
      role: user.role,
    });
  }
}
