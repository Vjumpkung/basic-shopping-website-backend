import { Module } from '@nestjs/common';
import { ShoppingCartController } from './shopping_cart.controller';
import { ShoppingCartService } from './shopping_cart.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ShoppingCartSchema } from 'src/schemas/shopping_cart.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'shopping_cart', schema: ShoppingCartSchema },
    ]),
  ],
  controllers: [ShoppingCartController],
  providers: [ShoppingCartService],
  exports: [ShoppingCartModule, ShoppingCartService],
})
export class ShoppingCartModule {}
