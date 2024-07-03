import { IsString } from "class-validator";

export class ActorDto{
    @IsString()
    readonly name: string
    @IsString()
    readonly image: string
    
}