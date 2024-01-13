import { Module } from '@nestjs/common';
import { AddressesController } from './addresses.controller';
import { AddressesService } from './addresses.service';
import { MongooseModule } from '@nestjs/mongoose';
import { AddressSchema } from 'src/schemas/address.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'addresses', schema: AddressSchema }]),
  ],
  controllers: [AddressesController],
  providers: [AddressesService],
})
export class AddressesModule {}
