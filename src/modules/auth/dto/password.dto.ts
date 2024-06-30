import { IsString } from "class-validator";

export class PasswordDto{
    @IsString()
    readonly passwordNew: string

    @IsString()
    readonly passwordOld:string
}