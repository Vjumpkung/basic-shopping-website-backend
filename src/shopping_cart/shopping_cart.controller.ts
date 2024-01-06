import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ShoppingCartService } from './shopping_cart.service';
import { UserJwt } from 'src/auth/user.jwt';
import { AddToCartDto } from './dto/cart.add.dto';
import { AuthUser } from 'src/decorators/authuser.decorator';
import { Types } from 'mongoose';
import { UserRole } from 'src/enums/user.role';
import { Role } from 'src/decorators/user.role.decorator';
import {
  ApiBearerAuth,
  ApiBody,
  ApiNoContentResponse,
  ApiOkResponse,
  ApiOperation,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/auth.guard';
import { ParseMongoIdPipe } from 'src/pipes/mongo.objectid.pipe';
import { UpdateToCartDto } from './dto/cart.update.dto';
import { CartResponseDto } from './dto/cart.response.dto';

@ApiTags('shopping-cart')
@Controller('shopping-cart')
export class ShoppingCartController {
  constructor(private readonly shoppingCartService: ShoppingCartService) {}

  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @Role(UserRole.User)
  @ApiOperation({ summary: 'Require USER' })
  @ApiOkResponse({
    description: 'Get cart by user id',
    type: CartResponseDto,
    isArray: true,
  })
  @Get('user')
  async getCart(@AuthUser() { id }: UserJwt) {
    return await this.shoppingCartService.getCartByUserId(
      new Types.ObjectId(id),
    );
  }

  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @Role(UserRole.User)
  @ApiOperation({ summary: 'Require USER' })
  @ApiBody({ type: AddToCartDto })
  @ApiNoContentResponse({ description: 'Product added to cart' })
  @HttpCode(HttpStatus.NO_CONTENT)
  @Post('add')
  async addToCart(
    @Body() addToCartDto: AddToCartDto,
    @AuthUser() { id }: UserJwt,
  ) {
    await this.shoppingCartService.addToCart(
      new Types.ObjectId(id),
      addToCartDto,
    );
  }

  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @Role(UserRole.User)
  @ApiOperation({ summary: 'Require USER' })
  @ApiQuery({ type: String, name: 'cart_id', description: 'Cart ID' })
  @ApiBody({ type: UpdateToCartDto })
  @ApiNoContentResponse({ description: 'Cart updated' })
  @HttpCode(HttpStatus.NO_CONTENT)
  @Patch('update')
  async updateCart(
    @Query('cart_id', new ParseMongoIdPipe()) cartId: Types.ObjectId,
    @Body() updateToCartDto: UpdateToCartDto,
  ) {
    await this.shoppingCartService.updateCart(cartId, updateToCartDto);
  }

  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @Role(UserRole.User)
  @ApiOperation({ summary: 'Require USER' })
  @ApiQuery({ type: String, name: 'cart_id', description: 'Cart ID' })
  @ApiNoContentResponse({ description: 'Product removed from cart' })
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete('remove')
  async removeFromCart(
    @Query('cart_id', new ParseMongoIdPipe()) cartId: Types.ObjectId,
  ) {
    await this.shoppingCartService.removeFromCart(cartId);
  }
}
