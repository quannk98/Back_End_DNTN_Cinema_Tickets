import { IsString } from "class-validator";

export class RoomDto{
    @IsString()
    readonly name: string

    @IsString()
    readonly movie: string

    @IsString()
    readonly showtime: string

    @IsString()
    readonly cinema:string
}