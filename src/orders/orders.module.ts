import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { envs, ORDERS_SERVICE } from '../config';
import { OrdersController } from './orders.controller';

@Module({
  controllers: [OrdersController],
  providers: [],
  imports: [
    ClientsModule.register([
      {
        name: ORDERS_SERVICE,
        transport: Transport.TCP,
        options: {
          host: envs.ORDERS_MICROSERVICES_HOST,
          port: envs.ORDERS_MICROSERVICES_PORT,
        },
      },
    ]),
  ],
})
export class OrdersModule { }
