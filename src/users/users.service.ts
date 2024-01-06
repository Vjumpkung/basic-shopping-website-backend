import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { userSchema } from 'src/schemas/users.schema';
import { UserCreateDto } from './dto/user.create.dto';
import * as bcrypt from 'bcrypt';
import { UserRole } from 'src/enums/user.role';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel('users')
    private readonly usersModel: Model<userSchema>,
  ) {}

  async findAll(): Promise<userSchema[]> {
    return await this.usersModel.find({ deleted_at: null }).exec();
  }

  async createUser(userCreateDto: UserCreateDto) {
    if (
      await this.usersModel.findOne({ username: userCreateDto.username }).exec()
    ) {
      throw new BadRequestException('Username already used');
    }
    const hash = await bcrypt.hash(userCreateDto.password, 10);
    const user = await this.usersModel.create({
      username: userCreateDto.username,
      password: hash,
      role: userCreateDto.role,
    });
    await user.save();
  }

  async updateUserRoleToAdmin(id: Types.ObjectId) {
    await this.usersModel
      .updateOne({ _id: id }, { role: UserRole.Admin })
      .exec();
  }

  async updateUserRoleToUser(id: Types.ObjectId) {
    await this.usersModel
      .updateOne({ _id: id }, { role: UserRole.User })
      .exec();
  }

  async deleteUser(id: Types.ObjectId) {
    await this.usersModel
      .updateOne({ _id: id }, { deleted_at: new Date() })
      .exec();
  }
}
