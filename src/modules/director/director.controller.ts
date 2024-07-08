import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Res,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { DirectorService } from './director.service';
import { DirectorDto } from './dto/director.dto';
import { Director } from 'src/schemas/directors.schema';
import { AuthAdminGuard } from '../auth/dto/admin.guard';
import { diskStorage } from 'multer';
import * as path from 'path';
import { v4 as uuidv4 } from 'uuid';
import { FileInterceptor } from '@nestjs/platform-express';
import { Observable, of } from 'rxjs';
import { join } from 'path';
import { AuthGuard } from '../auth/auth.guard';

@Controller('directors')
export class DirectorController {
  constructor(private readonly directorService: DirectorService) {}

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
    @Body() directorDto: DirectorDto,
    @UploadedFile() image: Express.Multer.File,
  ): Promise<any> {
    try {
      const created = { ...directorDto, image: image.filename };
      const createdDirector =
        await this.directorService.createDirector(created);
      return {
        createdDirector,
      };
    } catch (error) {
      console.error('Error creating director:', error);
      return {
        statusCode: 500,
        message: 'Error creating director',
      };
    }
  }

  @UseGuards(AuthAdminGuard)
  @Get('')
  async getAll(): Promise<any> {
    try {
      const getAll = await this.directorService.getAlldirector();
      return {
        data: {
          getAll,
        },
        statusCode: 200,
        message: 'Get all director success',
      };
    } catch (error) {
      console.log('error ', error);
    }
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  async getDirector(@Param('id') id: any): Promise<any> {
    try {
      const getDirector = await this.directorService.getdirector(id);
      return {
        getDirector,
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
    @Body() directorDto: DirectorDto,
    @UploadedFile() image: Express.Multer.File,
  ): Promise<any> {
    try {
      if (image === undefined) {
        const updateDirector = await this.directorService.updateDirector(
          id,
          directorDto,
        );
        return {
          updateDirector,
        };
      } else {
        const update = { ...directorDto, image: image.filename };
        const updateDirector = await this.directorService.updateDirector(
          id,
          update,
        );
        return {
          updateDirector,
        };
      }
    } catch (error) {
      return error.response;
    }
  }

  @UseGuards(AuthAdminGuard)
  @Delete(':id')
  async deleteDirector(@Param('id') id: any): Promise<any> {
    try {
      const deletedirector = await this.directorService.deleteDirector(id);
      await this.directorService.deleteDirector(id);
      return {
        deletedirector,
      };
    } catch (error) {
      console.log('error ', error);
    }
  }
}
