import { Injectable } from "@nestjs/common";
import { RoomReponsitory } from "src/repositories/room.reponsitory";
import { RoomDto } from "./dto/room.dto";

@Injectable()
export class RoomService{
    constructor(private readonly roomReponsitory: RoomReponsitory){}
    async createRoom(roomDto: RoomDto): Promise<any> {
        const room = await this.roomReponsitory.createRoom(roomDto);
        return room.data;
      }
    
      async getAllroom(): Promise<any> {
        const getall = await this.roomReponsitory.getAllroom();
        return getall;
      }
      async getroom(roomId: any): Promise<any> {
        const getRoom = await this.roomReponsitory.getroom(roomId);
        return getRoom;
      }

      async getRoomByMovie(movieId:any): Promise<any>{
        const getmovie = await this.roomReponsitory.getRoomByMovie(movieId)
        return getmovie
      }
    
      async updateRoom(roomId: any, dataUpdate): Promise<any> {
        const update = await this.roomReponsitory.updateRoom(roomId,dataUpdate
         );
        return update;
      }
    
      async deleteRoom(roomId: any): Promise<any> {
        const deleteRoom = await this.roomReponsitory.deleteRoom(roomId);
        return deleteRoom;
      }
}