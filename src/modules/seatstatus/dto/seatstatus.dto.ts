import { IsString } from "class-validator";

export class seatstatusDto{
    @IsString()
    readonly seat: string

    @IsString()
    readonly room:string

    @IsString()
    readonly day: string

    @IsString()
    readonly time: string
}