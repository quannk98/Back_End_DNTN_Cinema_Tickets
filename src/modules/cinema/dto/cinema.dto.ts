import { IsString } from "class-validator";

export class CinemaDto{
    @IsString()
    readonly name: string
    @IsString()
    readonly address: string
    @IsString()
    readonly hotline: string
}