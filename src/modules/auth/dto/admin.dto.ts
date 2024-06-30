import { IsString } from "class-validator";

export class AdminDto{
    @IsString()
    readonly name: string
    @IsString()
    readonly password: string
}