import { userSchema } from 'src/schemas/users.schema';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel('users')
    private readonly usersModel: Model<userSchema>,
  ) {}
}
