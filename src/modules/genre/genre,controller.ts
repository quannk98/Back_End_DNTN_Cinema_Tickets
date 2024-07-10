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
import { GenreService } from './genre.service';
import { AuthAdminGuard } from '../auth/dto/admin.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { GenreDto } from './dto/genre.dto';
import { AuthGuard } from '../auth/auth.guard';

@Controller('genres')
export class GenreController {
  constructor(private readonly genreService: GenreService) {}

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
    @Body() genreDto: GenreDto,
    @UploadedFile() image: Express.Multer.File,
  ): Promise<any> {
    try {
      const created = { ...genreDto, image: image.filename };
      const create = await this.genreService.Create(created);
      return {
        create,
      };
    } catch (error) {
      console.log('error ', error);
    }
  }

  @UseGuards(AuthGuard)
  @Get()
  async getAll(): Promise<any> {
    const getall = await this.genreService.getAll();
    return getall;
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  async getGenre(@Param('id') id : any): Promise<any> {
    const getgenre = await this.genreService.getGenre(id);
    return getgenre;
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
  async updateGenre(
    @Param('id') id: any,
    @Body() genreDto: GenreDto,
    @UploadedFile() image: Express.Multer.File,
  ): Promise<any> {
    if (image === undefined) {
      const update = await this.genreService.updateGenre(id, genreDto);
      return update;
    } else {
      const dataUpdate = {
        ...genreDto,
        image: image.filename,
      };

      const update = await this.genreService.updateGenre(id, dataUpdate);
      return update;
    }
  }

  @UseGuards(AuthAdminGuard)
  @Delete(':id')
  async DeleteGenre(@Param('id') id: any): Promise<any> {
    await this.genreService.deleteGenre(id);
    return await this.genreService.deleteGenre(id);
  }
}
