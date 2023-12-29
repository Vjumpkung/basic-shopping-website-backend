import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { settingsSchema } from 'src/schemas/settings.schema';
import { SettingsUpdateDto } from './dto/settings.update.dto';

@Injectable()
export class SettingsService {
  constructor(
    @InjectModel('settings')
    private readonly settingsModel: Model<settingsSchema>,
  ) {}

  async generateDefaultSettings() {
    const settings = new this.settingsModel({
      name: 'Lorem Ipsum',
      logo: '',
    });
    return await settings.save();
  }

  async getSettings() {
    const settings = await this.settingsModel.findOne().exec();
    if (settings === null) {
      return await this.generateDefaultSettings();
    }
    return settings;
  }

  async updateSettings(updateSettings: SettingsUpdateDto) {
    const settings_id = (await this.settingsModel.findOne().exec())._id;
    await this.settingsModel
      .updateOne({ _id: settings_id }, updateSettings)
      .exec();
  }
}
