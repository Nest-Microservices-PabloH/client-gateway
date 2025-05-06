import { Controller, Get, Post, Body, Param, Inject, ParseUUIDPipe } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { catchError } from 'rxjs';

import { ORDERS_SERVICE } from '../config';

import { CreateOrderDto, UpdateOrderDto } from './dto';

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
  findAll() {
    return this.ordersClient.send({ cmd: 'findAllOrders' }, {});
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.ordersClient.send({ cmd: 'findOneOrder' }, { id })
      .pipe(
        catchError(error => {
          throw new RpcException(error);
        })
      );
  }

}
