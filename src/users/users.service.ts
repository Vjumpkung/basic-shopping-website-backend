import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { userSchema } from 'src/schemas/users.schema';
import { UserCreateDto } from './dto/user.create.dto';
import * as bcrypt from 'bcrypt';
import { UserRole } from 'src/enums/user.role';
import { UpdateInfoDto } from './dto/user.update.info.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel('users')
    private readonly usersModel: Model<userSchema>,
  ) {}

  async findAll(): Promise<userSchema[]> {
    return await this.usersModel
      .find({ deleted_at: null }, { password: 0 })
      .exec();
  }

  async createUser(userCreateDto: UserCreateDto) {
    if (
      await this.usersModel
        .findOne({ username: userCreateDto.username, deleted_at: null })
        .exec()
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

  async updateUserInfo(userId: Types.ObjectId, updateInfo: UpdateInfoDto) {
    const user = await this.usersModel.findOne({ _id: userId }).lean().exec();
    if (await bcrypt.compare(updateInfo.oldPassword, user.password)) {
      if (updateInfo.newUsername) {
        const isExist = await this.usersModel
          .findOne({ username: updateInfo.newUsername })
          .exec();
        if (isExist) {
          throw new BadRequestException({
            message: 'ชื่อผู้ใช้นี้ถูกใช้ไปแล้ว',
          });
        }
        user.username = updateInfo.newUsername;
      }
      if (updateInfo.newPassword) {
        user.password = await bcrypt.hash(updateInfo.newPassword, 10);
      }
      await this.usersModel
        .updateOne(
          { _id: userId },
          {
            username: user.username,
            password: user.password,
          },
        )
        .exec();
    } else {
      throw new BadRequestException({
        message: 'รหัสผ่านไม่ถูกต้อง',
      });
    }
  }

  async updateUserRoleToAdmin(id: Types.ObjectId) {
    await this.usersModel
      .updateOne({ _id: id, deleted_at: null }, { role: UserRole.Admin })
      .exec();
  }

  async updateUserRoleToUser(id: Types.ObjectId) {
    await this.usersModel
      .updateOne({ _id: id, deleted_at: null }, { role: UserRole.User })
      .exec();
  }

  async deleteUser(id: Types.ObjectId) {
    await this.usersModel
      .updateOne({ _id: id, deleted_at: null }, { deleted_at: new Date() })
      .exec();
  }
}
