import { IsNotEmpty, IsString, IsNumber, IsPositive } from "class-validator";
import { Type } from "class-transformer";

export class CreateProductDto {

    @IsString()
    @IsNotEmpty()
    name: string;

    @IsNumber({
        maxDecimalPlaces: 4,
    })
    @IsPositive()
    @Type(() => Number)
    price: number;

}
