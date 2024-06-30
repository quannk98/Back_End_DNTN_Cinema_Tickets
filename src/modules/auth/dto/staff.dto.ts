import { IsString } from "class-validator";

export class StaffDto{
    @IsString()
    readonly email: string

    @IsString()
    readonly name: string

    @IsString()
    readonly password: string

    @IsString()
    readonly number_phone: string

    @IsString()
    readonly date_of_birth: string;
    
    @IsString()
    readonly gender: string;

    @IsString()
    readonly image: string

   
}