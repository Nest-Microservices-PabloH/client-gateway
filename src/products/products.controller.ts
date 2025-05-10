import { Controller, Delete, Get, Param, Patch, Post, Body, Inject, Query, ParseIntPipe } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { catchError } from 'rxjs';
import { NATS_SERVICE } from '../config';

import { PaginationDto } from '../common/dtos/pagination.dto';
import { CreateProductDto, UpdateProductDto } from './dto';


@Controller('products')
export class ProductsController {

  constructor(
    @Inject(NATS_SERVICE)
    private readonly client: ClientProxy
  ) { }

  @Post()
  createProduct(
    @Body() createProductDto: CreateProductDto
  ) {
    return this.client.send({ cmd: 'createProduct' }, createProductDto)
      .pipe(
        catchError(error => {
          throw new RpcException(error);
        })
      );
  }

  @Get()
  findAllProducts(
    @Query() paginationDto: PaginationDto
  ) {
    return this.client.send({ cmd: 'findAllProducts' }, paginationDto)
      .pipe(
        catchError(error => {
          throw new RpcException(error);
        })
      );
  }
  @Get(':id')
  async findOne(
    @Param('id') id: number
  ) {

    return this.client.send({ cmd: 'findOneProduct' }, { id })
      .pipe(
        catchError(error => {
          throw new RpcException(error);
        })
      );

    // try {

    //   const product = await firstValueFrom(this.productsClient.send({ cmd: 'findOneProduct' }, { id }));

    //   return product;

    // } catch (error) {
    //   throw new RpcException(error);
    // }
  }

  @Delete(':id')
  deleteProduct(
    @Param('id') id: number
  ) {
    return this.client.send({ cmd: 'deleteProduct' }, { id })
      .pipe(
        catchError(error => {
          throw new RpcException(error);
        })
      );

  }

  @Patch(':id')
  patchProduct(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateProductDto: UpdateProductDto
  ) {
    return this.client.send({ cmd: 'updateProduct' }, {
      ...updateProductDto,
      id
    }).pipe(
      catchError(error => {
        throw new RpcException(error);
      })
    );
  }
}
