import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema()
export class Cinema{
    @Prop()
    readonly name: string
    @Prop()
    readonly address: string
    @Prop()
    readonly hotline: string
}
export const CinemaSchema = SchemaFactory.createForClass(Cinema);