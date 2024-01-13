import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { addressSchema } from 'src/schemas/address.schema';
import { AddressCreateDto } from './dto/address.create.dto';
import { AddressUpdateDto } from './dto/address.update.dto';

@Injectable()
export class AddressesService {
  constructor(
    @InjectModel('addresses')
    private readonly addressesModel: Model<addressSchema>,
  ) {}

  getAddresses(id: Types.ObjectId) {
    return this.addressesModel.find({ user: id, deleted_at: null }).exec();
  }

  getAddressById(id: Types.ObjectId) {
    return this.addressesModel.findOne({ _id: id, deleted_at: null }).exec();
  }

  getDefaultAddress(id: Types.ObjectId) {
    return this.addressesModel
      .findOne({ user: id, default: true, deleted_at: null })
      .exec();
  }

  createAddress(id: Types.ObjectId, addressCreateDto: AddressCreateDto) {
    if (addressCreateDto.default === true) {
      this.addressesModel.updateMany({ user: id }, { default: false }).exec();
    }

    const address = new this.addressesModel({
      ...addressCreateDto,
      user: id,
    });
    return address.save();
  }

  async updateAddress(
    userid: Types.ObjectId,
    id: Types.ObjectId,
    addressUpdateDto: AddressUpdateDto,
  ) {
    if (addressUpdateDto.default === true) {
      await this.addressesModel
        .updateMany({ user: userid }, { default: false })
        .exec();
    }
    await this.addressesModel.updateOne({ _id: id }, addressUpdateDto).exec();
  }

  deleteAddress(id: Types.ObjectId) {
    this.addressesModel
      .updateOne({ _id: id }, { deleted_at: new Date() })
      .exec();
  }
}
