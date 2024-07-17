
import { IsArray, IsString } from "class-validator";

export class ShowtimeDto{
    @IsString()
    readonly movie: string

    @IsArray({each:true})
    readonly time: string

    @IsString()
    readonly date: string
}