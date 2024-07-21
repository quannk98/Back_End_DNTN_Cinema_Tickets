import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { SeatstatusReponsitory } from 'src/repositories/seatstatus.reponsitory';

@Injectable()
export class SeatstatusService {
  constructor(private readonly seatstatusReponsitory: SeatstatusReponsitory) {}

  async getAll(): Promise<any> {
    const getall = await this.seatstatusReponsitory.getAll();
    return getall;
  }

  async getSS(ssId: any): Promise<any> {
    const getss = await this.seatstatusReponsitory.getSeatstatus(ssId);
    return getss;
  }

  async getSeatStatusByRoomAndTime(
    roomId: any,
    showtimeId: any,
    timeId: any,
  ): Promise<any> {
    const gets = await this.seatstatusReponsitory.getSeatStatusByRoomAndTime(
      roomId,
      showtimeId,
      timeId,
    );
    return gets;
  }

  @Cron('45 * * * * *')
  async checkSS(): Promise<any> {
    await this.seatstatusReponsitory.checkSeatstatus();
  }

  async updateSs(ssId: any, data: any): Promise<any> {
    const update = await this.seatstatusReponsitory.updateSS(ssId, data);
    return update;
  }

  async deleteSs(ssId: any): Promise<any> {
    await this.seatstatusReponsitory.deleteSS(ssId);
  }
}
