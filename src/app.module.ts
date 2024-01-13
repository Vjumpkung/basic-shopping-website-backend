import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { MongooseConfigService } from './config/mongoose.service.config';
import { ProductsModule } from './products/products.module';
import { OrdersModule } from './orders/orders.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { SettingsModule } from './settings/settings.module';
import { configuration } from './config';
import { ChoicesModule } from './choices/choices.module';
import { SlipsModule } from './slips/slips.module';
import { ShoppingCartModule } from './shopping_cart/shopping_cart.module';
import { ShippingsModule } from './shippings/shippings.module';
import { AddressesModule } from './addresses/addresses.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true,
    }),
    MongooseModule.forRootAsync({
      useClass: MongooseConfigService,
    }),
    ProductsModule,
    OrdersModule,
    UsersModule,
    AuthModule,
    SettingsModule,
    ChoicesModule,
    SlipsModule,
    ShoppingCartModule,
    ShippingsModule,
    AddressesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
