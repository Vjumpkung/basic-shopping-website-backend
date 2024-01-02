import { Module } from '@nestjs/common';
import { ShippingsController } from './shippings.controller';
import { ShippingsService } from './shippings.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ShippingSchema } from 'src/schemas/shipping.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'shipping', schema: ShippingSchema }]),
  ],
  controllers: [ShippingsController],
  providers: [ShippingsService],
  exports: [ShippingsModule, ShippingsService],
})
export class ShippingsModule {}
