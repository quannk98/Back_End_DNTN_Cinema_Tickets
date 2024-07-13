import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";

@Schema()
export class Room{
    @Prop()
    readonly name: string

    @Prop({type:mongoose.Schema.Types.ObjectId,ref:'Movie'})
    readonly movie: string

    @Prop({type:mongoose.Schema.Types.ObjectId,ref:'Showtime'})
    readonly showtime: string

    @Prop({type:mongoose.Schema.Types.ObjectId,ref:'Cinema'})
    readonly cinema: string

}
export const RoomSchema = SchemaFactory.createForClass(Room);