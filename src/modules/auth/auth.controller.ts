import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  Request,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { AuthGuard } from './auth.guard';
import { RegisterEmailVerifyDto } from './dto/register-email-verify.dto';
import { LoginDto } from './dto/login.dto';
import { AdminDto } from './dto/admin.dto';
import { EUserRole } from 'src/common/enums/user.enum';
import { StaffDto } from './dto/staff.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { AuthAdminGuard } from './dto/admin.guard';
import { PasswordDto } from './dto/password.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() createUserDto: CreateUserDto): Promise<any> {
    try {
      const user = await this.authService.registerUser(createUserDto);

      const token = await this.authService.generateJwtToken(user);

      await this.authService.sendOtp(user._id, user.email);

      return {
        user,
        token,
      };
    } catch (error) {
      console.log('error', error.response);
    }
  }

  @UseGuards(AuthGuard)
  @Put('register/verify')
  async registerEmailVerify(
    @Request() req,
    @Body() registerEmailVerifyDto: RegisterEmailVerifyDto,
  ): Promise<any> {
    const checkOtp = await this.authService.registerEmailVerify(
      req.user.sub,
      req.user.email,
      registerEmailVerifyDto,
    );
    console.log('a', checkOtp);
    if (checkOtp) {
      return 'Otp success';
    } else {
      return checkOtp;
    }
  }

  @Post('login')
  async login(@Body() loginDto: LoginDto): Promise<any> {
    try {
      const user = await this.authService.login(loginDto);
      if (user) {
        const token = await this.authService.generateJwtToken(user);
        return {
          user,
          token,
        };
      } else {
        return user;
      }
    } catch (error) {
      return error.response;
    }
  }

  @Post('create-admin')
  async createAdmin(@Body() adminDto: AdminDto): Promise<any> {
    try {
      const createadmin = await this.authService.createAdmin(adminDto);

      return {
        createadmin,
      };
    } catch (error) {
      return error.response;
    }
  }
  @Post('login-admin')
  async loginAdmin(@Body() adminDto: AdminDto): Promise<any> {
    
      const admin = await this.authService.loginAdmin(adminDto);
      if (!admin) {
        return admin;
      } else {
        const token = await this.authService.generateJwtTokenAdmin(admin);
        return {
          admin,
          token,
        };
      }
  
  }

  @Post('forgot-password')
  async ForgotPassword(@Query('email') email): Promise<any> {
    const user = await this.authService.findEmail(email);
    const token = await this.authService.generateJwtToken(user);
    await this.authService.sendOtpForgotPassword(user._id, user.email);
    return {
      user,
      token,
    };
  }

  @UseGuards(AuthGuard)
  @Put('forgot-password/verify')
  async VerifyForgotPassword(
    @Request() req,
    @Body() registerEmailVerifyDto: RegisterEmailVerifyDto,
  ): Promise<any> {
    const checkOtp = await this.authService.ForgotPasswordEmailVerify(
      req.user.sub,
      req.user.email,
      registerEmailVerifyDto,
    );

    if (checkOtp) {
      return 'Otp success';
    } else {
      return checkOtp;
    }
  }
}

@Controller('users')
export class UserController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(AuthAdminGuard)
  @Post('staff')
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
  async CreateStaff(
    @Body() staffDto: StaffDto,
    @UploadedFile() image: Express.Multer.File,
  ): Promise<any> {
    const data = {
      ...staffDto,
      image: image.filename,
    };
    const create = await this.authService.createStaff(data);
    return {
      create,
    };
  }

  @UseGuards(AuthAdminGuard)
  @Get('')
  async getAllUser(): Promise<any> {
    const getAll = await this.authService.getAllUser();
    return {
      getAll,
    };
  }
  @UseGuards(AuthGuard)
  @Get('staff')
  async getAllStaffAdmin(): Promise<any> {
    const getall = await this.authService.getAllStaff();
    return {
      getall,
    };
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  async getUser(@Param('id') id: any): Promise<any> {
    const getUser = await this.authService.getUser(id);
    return {
      getUser,
    };
  }

  @UseGuards(AuthGuard)
  @Put('forgot-passowrd')
  async ForgotPassword(
    @Request() req,
    @Query('password') password,
  ): Promise<any> {
    const resetpassword = await this.authService.NewPassword(
      req.user.sub,
      password,
    );
    return resetpassword;
  }

  @UseGuards(AuthGuard)
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
  async Update(
    @Param('id') id: any,
    @Body() userDto: CreateUserDto,
    @UploadedFile() image: Express.Multer.File,
  ): Promise<any> {
    if (image === undefined) {
      const update = await this.authService.update(id, userDto);
      return update;
    } else {
      const dataupdate = {
        ...userDto,
        image: image.filename,
      };
      const update = await this.authService.update(id, dataupdate);
      return update;
    }
  }

  @UseGuards(AuthGuard)
  @Put('password/:id')
  async Updatepassword(
    @Param('id') id: any,
    @Body() passwordDto: PasswordDto,
  ): Promise<any> {
    const update = await this.authService.updatePassword(
      id,
      passwordDto.passwordNew,
      passwordDto.passwordOld,
    );
    return update;
  }

  @UseGuards(AuthAdminGuard)
  @Delete(':id')
  async DeleteUser(@Param('id') id: any): Promise<any> {
    const deleteuser = await this.authService.deleteUser(id);
    await this.authService.deleteUser(id);
    return {
      deleteuser,
    };
  }

  @UseGuards(AuthGuard)
  @Get('staff/:id')
  async getStaff(@Param('id') id: any) {
    const getstaff = await this.authService.getStaff(id);
    return {
      getstaff,
    };
  }
}
