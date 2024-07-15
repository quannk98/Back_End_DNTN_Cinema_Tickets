import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { SeatService } from './seat.srevice';
import { AuthAdminGuard } from '../auth/dto/admin.guard';
import { SeatDto } from './dto/seat.dto';
import { AuthGuard } from '../auth/auth.guard';

@Controller('seats')
export class SeatController {
  constructor(private readonly seatService: SeatService) {}
  @UseGuards(AuthAdminGuard)
  @Post('')
  async create(@Body() seatDto: SeatDto): Promise<any> {
    try {
      const create = await this.seatService.createSeat(seatDto);

      return {
        data: {
          create,
        },
      };
    } catch (error) {
      return error.reponse;
    }
  }

  

  @UseGuards(AuthGuard)
  @Get('')
  async getAllseat(): Promise<any> {
    const getall = await this.seatService.getAllseat();
    return getall;
  }
  @UseGuards(AuthGuard)
  @Get('room/:roomId')
  async getSeatByRoom(@Param('roomid') id: any): Promise<any> {
    const getSeat = await this.seatService.getSeatByRoom(id);
    return getSeat;
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  async getSeatUser(@Param('id') id: any): Promise<any> {
    const getSeat = await this.seatService.getseat(id);
    return getSeat;
  }

  @UseGuards(AuthAdminGuard)
  @Put(':id')
  async update(@Param('id') id: any, @Body() seatDto: SeatDto): Promise<any> {
    try {
      const updated = await this.seatService.updateSeat(id, seatDto);
      return updated;
    } catch (error) {
      return error.reponse;
    }
  }

  @UseGuards(AuthAdminGuard)
  @Delete(':id')
  async deleteSeat(@Param('id') id: any): Promise<any> {
    const deleteseat = await this.seatService.deleteSeat(id);
    await this.seatService.deleteSeat(id);
    return deleteseat;
  }
}
