import { IsArray, IsString } from "class-validator";

export class DiscountDto{
    @IsString()
    readonly name: string

    @IsString()
    readonly image: string

    @IsString()
    readonly percent: string

    @IsString()
    readonly code: string

    @IsArray({each:true})
    readonly cinema: string

    @IsString()
    readonly dayStart: string

    @IsString()
    readonly dayEnd: string
}