import {
  Body,
  ConflictException,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';

import { AuthAdminGuard } from '../auth/dto/admin.guard';
import { CinemaService } from './cinema.service';
import { CinemaDto } from './dto/cinema.dto';
import { AuthGuard } from '../auth/auth.guard';

@Controller('cinemas')
export class CinemaController {
  constructor(private readonly cinemaService: CinemaService) {}

  @UseGuards(AuthAdminGuard)
  @Post('')
  async create(@Body() cinemaDto: CinemaDto): Promise<any> {
    try {
      const createCinema = await this.cinemaService.createCinema(cinemaDto);

      return {
        createCinema,
      };
    } catch (error) {
      return error.response;
    }
  }

  @UseGuards(AuthAdminGuard)
  @Get('')
  async getAll(): Promise<any> {
    try {
      const getAll = await this.cinemaService.getAllcinema();
      return {
        getAll,
      };
    } catch (error) {
      console.log('error ', error);
    }
  }

 

  @UseGuards(AuthGuard)
  @Get(':id')
  async getCinema(@Param('id') id: any): Promise<any> {
    try {
      const getCinema = await this.cinemaService.getcinema(id);
      return {
        getCinema,
      };
    } catch (error) {
      console.log('error ', error);
    }
  }

  @UseGuards(AuthAdminGuard)
  @Put(':id')
  async update(
    @Param('id') id: any,
    @Body() cinemaDto: CinemaDto,
  ): Promise<any> {
    try {
      const updateCinema = await this.cinemaService.updateCinema(id, cinemaDto);
      return {
        updateCinema,
      };
    } catch (error) {
      return error.response;
    }
  }

  @UseGuards(AuthAdminGuard)
  @Delete(':id')
  async deleteCinema(@Param('id') id: any): Promise<any> {
    try {
      const deletecinema = await this.cinemaService.deleteCinema(id);
      await this.cinemaService.deleteCinema(id);
      return {
        deletecinema,
      };
    } catch (error) {
      console.log('error ', error);
    }
  }
}
