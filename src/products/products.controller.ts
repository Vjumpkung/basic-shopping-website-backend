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
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { ProductsService } from './products.service';
import { ProductCreateDto } from './dto/product.create.dto';
import { productSchema } from 'src/schemas/products.schema';
import { AuthGuard } from 'src/auth/auth.guard';
import { Role } from 'src/decorators/user.role.decorator';
import { UserRole } from 'src/enums/user.role';
import { ProductsResponseDto } from './dto/product.response.dto';
import { Types } from 'mongoose';
import { ParseMongoIdPipe } from 'src/pipes/mongo.objectid.pipe';
import { ProductUpdateDto } from './dto/product.update.dto';

@Controller('products')
@ApiTags('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @ApiQuery({ name: 'status', enum: ['all', 'publish'] })
  @ApiResponse({ type: ProductsResponseDto, isArray: true })
  @Get()
  async getProducts(@Query('status') status: string) {
    return await this.productsService.getProducts(status);
  }

  @ApiParam({ name: 'id', type: String })
  @ApiResponse({ type: ProductsResponseDto })
  @Get(':id')
  async getProductById(
    @Param('id', new ParseMongoIdPipe()) id: Types.ObjectId,
  ) {
    return await this.productsService.getProductById(id);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Role(UserRole.Admin)
  @ApiOperation({ summary: 'Require ADMIN' })
  @Post()
  @ApiBody({ type: ProductCreateDto })
  @ApiCreatedResponse({ type: productSchema })
  async createProduct(@Body() productCreateDto: ProductCreateDto) {
    return await this.productsService.createProduct(productCreateDto);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Role(UserRole.Admin)
  @ApiOperation({ summary: 'Require ADMIN' })
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiNoContentResponse({ description: 'update product' })
  @ApiBody({ type: ProductUpdateDto })
  @ApiParam({ name: 'id', type: String })
  @Patch(':id/update')
  async updateProduct(
    @Param('id', new ParseMongoIdPipe()) _id: Types.ObjectId,
    @Body() productUpdateDto: ProductUpdateDto,
  ) {
    await this.productsService.updateProduct(_id, productUpdateDto);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Role(UserRole.Admin)
  @ApiOperation({ summary: 'Require ADMIN' })
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiNoContentResponse({ description: 'publish product' })
  @ApiParam({ name: 'id', type: String })
  @Patch(':id/publish')
  async publishProduct(
    @Param('id', new ParseMongoIdPipe()) id: Types.ObjectId,
  ) {
    await this.productsService.changeProductStatus(id, true);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Role(UserRole.Admin)
  @ApiOperation({ summary: 'Require ADMIN' })
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiNoContentResponse({ description: 'draft product' })
  @ApiParam({ name: 'id', type: String })
  @Patch(':id/draft')
  async draftProduct(@Param('id', new ParseMongoIdPipe()) id: Types.ObjectId) {
    await this.productsService.changeProductStatus(id, false);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Role(UserRole.Admin)
  @ApiOperation({ summary: 'Require ADMIN' })
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiNoContentResponse({ description: 'delete product' })
  @ApiParam({ name: 'id', type: String })
  async deleteProduct(@Param('id', new ParseMongoIdPipe()) id: Types.ObjectId) {
    await this.productsService.deleteProduct(id);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Role(UserRole.Admin)
  @ApiOperation({ summary: 'Require ADMIN' })
  @ApiNoContentResponse({ description: 'update product status' })
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiParam({ name: 'id', type: String })
  @ApiQuery({ name: 'available', type: Boolean })
  @Patch(':id')
  async updateProductAvailable(
    @Param('id', new ParseMongoIdPipe()) id: Types.ObjectId,
    @Query('available') available: boolean,
  ) {
    await this.productsService.updateAvailable(id, available);
  }
}
