import { IsString } from "class-validator";

export class GenreDto{
    @IsString()
    readonly name:string

    @IsString()
    readonly image:string

}