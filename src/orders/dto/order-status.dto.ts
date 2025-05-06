import { IsEnum, IsOptional } from "class-validator";

import { OrderStatus } from "../enum/order.enum";

export class OrderStatusDto {

    @IsOptional()
    @IsEnum(OrderStatus, {
        message: `Invalid order status, valid statuses are: ${Object.values(OrderStatus).join(', ')}`
    })
    status: OrderStatus;
}


