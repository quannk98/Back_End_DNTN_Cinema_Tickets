import { Injectable } from '@nestjs/common';
import { ShowtimeReponsitory } from 'src/repositories/showtime.reponsitory';
import { ShowtimeDto } from './dto/showtime.dto';
import { Showtime } from 'src/schemas/showtime.schema';


@Injectable()
export class ShowtimeService {
  constructor(private readonly showtimeReponsitory: ShowtimeReponsitory) {}
  async createShowtime(showtimeDto: ShowtimeDto): Promise<Showtime> {
          
      const showtime = await this.showtimeReponsitory.createShowtime(showtimeDto);    
      return showtime.data;
   
  }

  async getAllshowtime(): Promise<Showtime> {
    const getall = await this.showtimeReponsitory.getAllShowtime();
    return getall;
  }
  async getshowtime(showtimeId: any): Promise<Showtime> {
    const getShowtime = await this.showtimeReponsitory.getShowtime(showtimeId);
    return getShowtime;
  }

  async updateShowtime(showtimeId: any, showtimeDto: ShowtimeDto): Promise<Showtime> {
    const update = await this.showtimeReponsitory.updateShowtime(showtimeId, showtimeDto
    );
    return update;
  }

  async deleteShowtime(showtimeId: any): Promise<Showtime> {
    const deleteShowtime = await this.showtimeReponsitory.deleteShowtime(showtimeId);
    return deleteShowtime;
  }
}
