import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { SeatstatusService } from './seatstatus.service';
import { seatstatusDto } from './dto/seatstatus.dto';
import { AuthGuard } from '../auth/auth.guard';
import { AuthAdminGuard } from '../auth/dto/admin.guard';

@Controller('seatstatus')
export class SeatstatusController {
  constructor(private readonly seatstatusService: SeatstatusService) {}

  @UseGuards(AuthGuard)
  @Get()
  async getAll(): Promise<any> {
    const getall = await this.seatstatusService.getAll();
    return getall;
  }

  @UseGuards(AuthGuard)
  @Get('seat')
  async getSeatStatusByRoomAndTime(
    @Query('roomId') roomId,
    @Query('showtimeId') showtimeId,
    @Query('timeId') timeId,
  ): Promise<any> {
    const gets = await this.seatstatusService.getSeatStatusByRoomAndTime(
      roomId,
      showtimeId,
      timeId,
    );
    return gets;
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  async getSs(@Param('id') id: any): Promise<any> {
    const getss = await this.seatstatusService.getSS(id);
    return getss;
  }

  @UseGuards(AuthAdminGuard)
  @Put(':id')
  async updateSs(
    @Param('id') id: any,
    @Body() seatstatusDto: seatstatusDto,
  ): Promise<any> {
    const update = await this.seatstatusService.updateSs(id, seatstatusDto);
    return update;
  }

  @UseGuards(AuthAdminGuard)
  @Delete(':id')
  async deleteSs(@Param('id') id: any): Promise<any> {
    await this.seatstatusService.deleteSs(id);
  }
}
