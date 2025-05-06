import { IsBoolean, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsPositive } from "class-validator";
import { OrderStatus, OrderStatusList } from "../enum/order.enum";

export class CreateOrderDto {
    @IsNotEmpty()
    @IsNumber()
    @IsPositive()
    totalAmount: number;

    @IsNotEmpty()
    @IsNumber()
    @IsPositive()
    totalItems: number;

    @IsEnum(OrderStatus, {
        message: `Status must be one of the following: ${OrderStatusList.join(', ')}`
    })
    @IsOptional()
    status: OrderStatus = OrderStatus.PENDING;

    @IsBoolean()
    @IsOptional()
    paid: boolean = false;
}
