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

import { AuthAdminGuard } from '../auth/dto/admin.guard';
import { ShowtimeService } from './showtime.service';
import { ShowtimeDto } from './dto/showtime.dto';
import { AuthGuard } from '../auth/auth.guard';

@Controller('showtimes')
export class ShowtimeController {
  constructor(private readonly showtimeService: ShowtimeService) {}

  @UseGuards(AuthAdminGuard)
  @Post('')
  async create(@Body() showtimeDto: ShowtimeDto): Promise<any> {
    try {
      const createST = {
        ...showtimeDto,
        time: showtimeDto.time,
      };
      const createShowtime =
        await this.showtimeService.createShowtime(createST);
      return {
        createShowtime,
      };
    } catch (error) {
      console.log('error', error);
      return error.response;
    }
  }

  @UseGuards(AuthAdminGuard)
  @Get('')
  async getAll(): Promise<any> {
    try {
      const getAll = await this.showtimeService.getAllshowtime();
      return {
        getAll,
      };
    } catch (error) {
      console.log('error ', error);
    }
  }
  @UseGuards(AuthGuard)
  @Get(':id')
  async getShowtime(@Param('id') id: any): Promise<any> {
    try {
      const getShowtime = await this.showtimeService.getshowtime(id);
      return {
        getShowtime,
      };
    } catch (error) {
      console.log('error ', error);
    }
  }

  @UseGuards(AuthAdminGuard)
  @Put(':id')
  async update(
    @Param('id') id: any,
    @Body() showtimeDto: ShowtimeDto,
  ): Promise<any> {
    try {
      const updateShowtime = await this.showtimeService.updateShowtime(
        id,
        showtimeDto,
      );
      return {
        updateShowtime,
      };
    } catch (error) {
      return error.response;
    }
  }

  @UseGuards(AuthAdminGuard)
  @Delete(':id')
  async deleteShowtime(@Param('id') id: any): Promise<any> {
    try {
      const deletest = await this.showtimeService.deleteShowtime(id);
      await this.showtimeService.deleteShowtime(id);
      return {
        deletest,
      };
    } catch (error) {
      console.log('error ', error);
    }
  }
}
