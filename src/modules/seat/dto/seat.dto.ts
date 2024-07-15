import { IsString } from "class-validator";

export class SeatDto{
    @IsString()
    readonly name: string

    @IsString()
    readonly price: string
    
    @IsString()
    readonly room: string

}