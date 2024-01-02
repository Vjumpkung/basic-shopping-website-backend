import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { OrdersSchema } from 'src/schemas/orders.schema';
import { ShippingsModule } from 'src/shippings/shippings.module';

@Module({
  imports: [
    ShippingsModule,
    MongooseModule.forFeature([{ name: 'orders', schema: OrdersSchema }]),
  ],
  controllers: [OrdersController],
  providers: [OrdersService],
})
export class OrdersModule {}
