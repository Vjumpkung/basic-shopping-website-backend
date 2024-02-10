import { OrdersService } from './orders.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { CreateOrderDto } from './dto/order.create.dto';
import { orderSchema } from 'src/schemas/orders.schema';
import { ParseMongoIdPipe } from 'src/pipes/mongo.objectid.pipe';
import { Types } from 'mongoose';
import { OrderStatus } from 'src/enums/order.status';
import { CancelledOrderDto } from './dto/cancelled.order.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { Role } from 'src/decorators/user.role.decorator';
import { UserRole } from 'src/enums/user.role';
import { ShippingCreateDto } from './dto/shipping.crate.dto';
import { UserJwt } from 'src/auth/user.jwt';
import { AuthUser } from 'src/decorators/authuser.decorator';
import { OrdersByUserIdResponseDto } from './dto/orders.by.user.response.dto';
import { OrdersAllResponseDto } from './dto/orders.all.response.dto';
import { OrderResponseDto } from './dto/order.by.id.dto';

@Controller('orders')
@ApiTags('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @Role(UserRole.Admin)
  @ApiOperation({ summary: 'Require ADMIN' })
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    description: 'Get all orders',
    type: OrdersAllResponseDto,
    isArray: true,
  })
  @Get()
  async getOrders() {
    return await this.ordersService.getOrders();
  }

  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @Role(UserRole.Admin)
  @ApiOperation({ summary: 'Require ADMIN' })
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    description: 'Get order by id',
    type: OrderResponseDto,
  })
  @ApiParam({ name: 'id', type: String })
  @Get(':id')
  async getOrderById(@Param('id', new ParseMongoIdPipe()) _id: Types.ObjectId) {
    return await this.ordersService.getOrderById(_id);
  }

  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @Role(UserRole.User)
  @ApiOperation({ summary: 'Require USER' })
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    description: 'Get order by user id',
    type: OrdersByUserIdResponseDto,
    isArray: true,
  })
  @Get('/user/id')
  getOrdersByUserId(@AuthUser() { id: userId }: UserJwt) {
    return this.ordersService.getOrdersByUserId(new Types.ObjectId(userId));
  }

  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @Role(UserRole.User)
  @ApiOperation({ summary: 'Require USER' })
  @ApiCreatedResponse({ description: 'Create order', type: orderSchema })
  @ApiBody({ type: CreateOrderDto })
  @HttpCode(HttpStatus.CREATED)
  @Post()
  async createOrder(
    @Body() createOrderDto: CreateOrderDto,
    @AuthUser() { id }: UserJwt,
  ) {
    return await this.ordersService.createOrder(
      new Types.ObjectId(id),
      createOrderDto,
    );
  }

  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @Role(UserRole.Admin)
  @ApiOperation({ summary: 'Require ADMIN' })
  @ApiParam({ name: 'id', type: String })
  @ApiNoContentResponse({ description: 'Update order status to MUST_BE_PAID' })
  @HttpCode(HttpStatus.NO_CONTENT)
  @Patch(':id/must_be_paid')
  async orderMustBePaid(
    @Param('id', new ParseMongoIdPipe()) _id: Types.ObjectId,
  ) {
    await this.ordersService.updateStatus(_id, OrderStatus.MustBePaid);
  }

  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @Role(UserRole.Admin)
  @ApiOperation({ summary: 'Require ADMIN' })
  @ApiParam({ name: 'id', type: String })
  @ApiNoContentResponse({
    description: 'Update order status to MUST_BE_SHIPPED',
  })
  @HttpCode(HttpStatus.NO_CONTENT)
  @Patch(':id/must_be_shipped')
  async orderMustBeShipped(
    @Param('id', new ParseMongoIdPipe()) _id: Types.ObjectId,
  ) {
    await this.ordersService.updateStatus(_id, OrderStatus.MustBeShipped);
  }

  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @Role(UserRole.Admin)
  @ApiOperation({ summary: 'Require ADMIN' })
  @ApiParam({ name: 'id', type: String })
  @ApiBody({ type: ShippingCreateDto })
  @ApiNoContentResponse({
    description: 'Update order status to MUST_BE_RECIEVED',
  })
  @HttpCode(HttpStatus.NO_CONTENT)
  @Patch(':id/must_be_recieved')
  async orderMustBeRecieved(
    @Param('id', new ParseMongoIdPipe()) _id: Types.ObjectId,
    @Body() shippingCreateDto: ShippingCreateDto,
  ) {
    await this.ordersService.updateStatus(
      _id,
      OrderStatus.MustBeReceived,
      shippingCreateDto,
    );
  }

  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @Role(UserRole.Admin)
  @ApiOperation({ summary: 'Require ADMIN' })
  @ApiParam({ name: 'id', type: String })
  @ApiNoContentResponse({
    description: 'Update order status to COMPLETED',
  })
  @HttpCode(HttpStatus.NO_CONTENT)
  @Patch(':id/completed')
  async orderCompleted(
    @Param('id', new ParseMongoIdPipe()) _id: Types.ObjectId,
  ) {
    await this.ordersService.updateStatus(_id, OrderStatus.Completed);
  }

  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @Role(UserRole.Admin)
  @ApiOperation({ summary: 'Require ADMIN' })
  @ApiParam({ name: 'id', type: String })
  @ApiNoContentResponse({
    description: 'Update order status to CANCELLED',
  })
  @HttpCode(HttpStatus.NO_CONTENT)
  @Patch(':id/cancelled')
  async orderCancelled(
    @Param('id', new ParseMongoIdPipe()) _id: Types.ObjectId,
    @Body() cancelledOrderDto: CancelledOrderDto,
  ) {
    await this.ordersService.cancelledOrder(
      _id,
      cancelledOrderDto.cancelled_reason,
    );
  }

  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @Role(UserRole.Admin)
  @ApiOperation({ summary: 'Require ADMIN' })
  @ApiParam({ name: 'id', type: String })
  @ApiNoContentResponse({
    description: 'Update order status to REFUNDED',
  })
  @HttpCode(HttpStatus.NO_CONTENT)
  @Patch(':id/refunded')
  async orderRefunded(
    @Param('id', new ParseMongoIdPipe()) _id: Types.ObjectId,
  ) {
    await this.ordersService.updateStatus(_id, OrderStatus.Refunded);
  }

  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @Role(UserRole.Admin)
  @ApiOperation({ summary: 'Require ADMIN' })
  @ApiParam({ name: 'id', type: String, description: 'order id' })
  @ApiQuery({ name: 'shipping_id', type: String, description: 'shipping id' })
  @ApiNoContentResponse({
    description: 'edit shipping id',
  })
  @HttpCode(HttpStatus.NO_CONTENT)
  @Patch(':id/edit')
  async editTracking(
    @Param('id', new ParseMongoIdPipe()) _id: Types.ObjectId,
    @Query('shipping_id', new ParseMongoIdPipe()) shipping_id: Types.ObjectId,
  ) {
    await this.ordersService.editTracking(_id, shipping_id);
  }

  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @Role(UserRole.Admin)
  @ApiOperation({ summary: 'Require ADMIN' })
  @ApiParam({ name: 'id', type: String })
  @ApiNoContentResponse({
    description: 'DELETE order',
  })
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  async deleteOrder(@Param('id', new ParseMongoIdPipe()) _id: Types.ObjectId) {
    await this.ordersService.deleteOrder(_id);
  }
}
