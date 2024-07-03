import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';

import { AuthAdminGuard } from '../auth/dto/admin.guard';
import { ActorService } from './actor.service';
import { ActorDto } from './dto/actor.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import path, { extname } from 'path';
import mime from 'mime';
import { AuthGuard } from '../auth/auth.guard';

@Controller('actors')
export class ActorController {
  constructor(private readonly actorService: ActorService) {}

  @UseGuards(AuthAdminGuard)
  @Post('')
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './public/images',
        filename: (req, file, cb) => {
          const filename = file.originalname;
          cb(null, `${filename}`);
        },
      }),
    }),
  )
  async create(
    @Body() actorDto: ActorDto,
    @UploadedFile() image: Express.Multer.File,
  ): Promise<any> {
    try {
      const created = { ...actorDto, image: image.filename };
      const createActor = await this.actorService.createActor(created);
      return {
        createActor,
      };
    } catch (error) {
      console.log('error ', error);
    }
  }

  @UseGuards(AuthAdminGuard)
  @Get('')
  async getAll(): Promise<any> {
    try {
      const getAll = await this.actorService.getAllactor();
      return {
        getAll,
      };
    } catch (error) {
      console.log('error ', error);
    }
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  async getActor(@Param('id') id: any): Promise<any> {
    try {
      const getActor = await this.actorService.getactor(id);
      return {
        getActor,
      };
    } catch (error) {
      console.log('error ', error);
    }
  }

  @UseGuards(AuthAdminGuard)
  @Put(':id')
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './public/images',
        filename: (req, file, cb) => {
          const filename = file.originalname;
          cb(null, `${filename}`);
        },
      }),
    }),
  )
  async update(
    @Param('id') id: any,
    @Body() actorDto: ActorDto,
    @UploadedFile() image: Express.Multer.File,
  ): Promise<any> {
    try {
      if (image === undefined) {
        const updateActor = await this.actorService.updateActor(id, actorDto);
        return {
          updateActor,
        };
      } else {
        const update = { ...actorDto, image: image.filename };
        const updateActor = await this.actorService.updateActor(id, update);
        return {
          updateActor,
        };
      }
    } catch (error) {
      return error.response;
    }
  }

  @UseGuards(AuthAdminGuard)
  @Delete(':id')
  async deleteActor(@Param('id') id: any): Promise<any> {
    try {
      const deleteactor = await this.actorService.deleteActor(id);
      await this.actorService.deleteActor(id);
      return {
        deleteactor,
      };
    } catch (error) {
      console.log('error ', error);
    }
  }
}
