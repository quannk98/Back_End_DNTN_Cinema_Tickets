import { IsNumber, IsString } from "class-validator";

export class PaymentDto{
    @IsNumber()
    readonly amount: number

    @IsString()
    readonly name: string
}