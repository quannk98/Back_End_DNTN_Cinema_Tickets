import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";

@Schema()
export class Showtime{
    @Prop({type:mongoose.Schema.Types.ObjectId,ref:'Movie'})
    readonly movie: mongoose.Types.ObjectId
    @Prop({type:[mongoose.Schema.Types.ObjectId],ref:'Time'})
    readonly time: mongoose.Types.ObjectId[]
    @Prop({type:Date})
    readonly date: Date
   
}
export const ShowtimeSchema = SchemaFactory.createForClass(Showtime);