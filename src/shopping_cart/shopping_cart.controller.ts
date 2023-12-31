import { Controller } from '@nestjs/common';
import { ShoppingCartService } from './shopping_cart.service';

@Controller('shopping-cart')
export class ShoppingCartController {
  constructor(private readonly shoppingCartService: ShoppingCartService) {}
}
