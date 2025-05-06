import { Controller, Get, Post, Body, Param, Inject, ParseUUIDPipe, Query, ParseEnumPipe, Patch } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { catchError } from 'rxjs';

import { PaginationDto } from '../common';
import { ORDERS_SERVICE } from '../config';

import { CreateOrderDto, OrderPaginationDto, OrderStatusDto } from './dto';


@Controller('orders')
export class OrdersController {
  constructor(
    @Inject(ORDERS_SERVICE)
    private readonly ordersClient: ClientProxy
  ) { }

  @Post()
  create(@Body() createOrderDto: CreateOrderDto) {
    return this.ordersClient.send({ cmd: 'createOrder' }, createOrderDto)
      .pipe(
        catchError(error => {
          throw new RpcException(error);
        })
      );
  }

  @Get()
  findAll(
    @Query() orderPaginationDto: OrderPaginationDto
  ) {
    return this.ordersClient.send({ cmd: 'findAllOrders' }, orderPaginationDto)
      .pipe(
        catchError(error => {
          throw new RpcException(error);
        })
      );
  }

  @Get('id/:id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.ordersClient.send({ cmd: 'findOneOrder' }, { id })
      .pipe(
        catchError(error => {
          throw new RpcException(error);
        })
      );
  }

  @Get(':status')
  findAllByStatus(
    @Param() statusDto: OrderStatusDto,
    @Query() paginationDto: PaginationDto
  ) {
    return this.ordersClient.send({ cmd: 'findAllOrders' }, {
      ...paginationDto,
      status: statusDto.status
    }).pipe(
      catchError(error => {
        throw new RpcException(error);
      })
    );
  }

  @Patch(':id')
  changeStatus(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() statusDto: OrderStatusDto
  ) {
    return this.ordersClient.send({ cmd: 'changeOrderStatus' }, {
      id,
      status: statusDto.status
    }).pipe(
      catchError(error => {
        throw new RpcException(error);
      })
    );
  }
}
