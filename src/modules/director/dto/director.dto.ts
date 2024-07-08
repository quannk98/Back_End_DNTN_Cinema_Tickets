import { IsString } from "class-validator";

export class DirectorDto{
    @IsString()
    readonly name: string
    @IsString()
    readonly image: string
}