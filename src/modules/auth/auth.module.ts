import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { JWT_EXPIRE, JWT_SECRET } from 'src/common/config/app.config';
import { UserOtp, UserOtpSchema } from 'src/schemas/user-otp.schema';
import { User, UserSchema } from 'src/schemas/user.schema';
import { AuthService } from './auth.service';
import { EmailService } from '../email/email.service';
import { UserRepository } from 'src/repositories/user.reponsitory';
import { UserOtpReponsitory } from 'src/repositories/user-otp.reponsitory';
import { AuthController, UserController } from './auth.controller';
import { AdminReponsitory } from 'src/repositories/admin.reponsitory';
import { Admin, AdminSchema } from 'src/schemas/admin.schema';


@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    MongooseModule.forFeature([{ name: UserOtp.name, schema: UserOtpSchema }]),
    MongooseModule.forFeature([{name:Admin.name,schema:AdminSchema}]),
    JwtModule.register({
      global: true,
      secret: JWT_SECRET,
      signOptions: { expiresIn: JWT_EXPIRE },
    }),
  ],
  providers: [AuthService, EmailService, UserRepository, UserOtpReponsitory,AdminReponsitory],
  controllers: [AuthController,UserController],
  exports: [JwtModule],
})
export class AuthModule {}
