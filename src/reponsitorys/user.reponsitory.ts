import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { get } from 'http';
import { Model } from 'mongoose';
import { IUserOtp } from 'src/common/enums/interfaces/user.interface';
import { EUserRole, EUserStatus } from 'src/common/enums/user.enum';
import { CreateUserDto } from 'src/modules/auth/dto/create-user.dto';
import { StaffDto } from 'src/modules/auth/dto/staff.dto';
import { UserOtp } from 'src/schemas/user-otp.schema';
import { User } from 'src/schemas/user.schema';

@Injectable()
export class UserRepository {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
    @InjectModel(UserOtp.name) private readonly userOtpModel: Model<UserOtp>,
  ) {}

  async createUser(createUserDto: CreateUserDto): Promise<any> {
    try {
      const exitsUser = await this.userModel.findOne({
        email: createUserDto.email,
        role: EUserRole.User,
        status: EUserStatus.ACTIVE,
      });
      if (exitsUser) throw new ConflictException('Email already exists');
      const register = await this.userModel.findOne({
        email: createUserDto.email,
        role: EUserRole.User,
        status: EUserStatus.INACTIVE,
      });
      if (register) {
        await this.userModel.findByIdAndDelete(register._id);
        const otp = await this.userOtpModel.findOne({ userId: register._id });
        await this.userOtpModel.findByIdAndDelete(otp._id);
      }

      const createdUSer = new this.userModel(createUserDto);

      await createdUSer.save();

      return createdUSer;
    } catch (error) {
      return {
        data: error.message,
      };
    }
  }
  async getAllUser(): Promise<any> {
    const getAlluser = await this.userModel.find({ role: EUserRole.User });
    return {
      data: getAlluser,
      message: 'Succesfully',
    };
  }
  async findUserById(userId: any): Promise<any> {
    const user = await this.userModel.findById(userId);
    if (!user) throw new UnauthorizedException('User not available');
    return user;
  }
  async findByEmail(email: string): Promise<any> {
    const user = await this.userModel.findOne({ email: email });

    if (!user) throw new UnauthorizedException('Invalid email or password');

    return user;
  }
  async updateUserById(userId: any, dataUpdate: any): Promise<any> {
    try {
      const update = await this.userModel.findByIdAndUpdate(
        userId,
        dataUpdate,
        {
          new: true,
        },
      );
      if (!update) {
        return {
          status: 'error',
          message: 'Update failed',
        };
      }
      return {
        data: update,
        message: 'Successfully',
      };
    } catch (error) {}
  }

  async updatePassword(userId: any, passwordNew: any): Promise<any> {
    try {
      const update = await this.userModel.findByIdAndUpdate(
        userId,
        { password: passwordNew },
        {
          new: true,
        },
      );
      if (!update) {
        return {
          status: 'error',
          message: 'Update failed',
        };
      }
      return {
        message: 'Đổi mật khẩu thành công',
      };
    } catch (error) {}
  }

  async deleteUserById(userId: any): Promise<any> {
    try {
      const deleteuser = await this.userModel.findByIdAndDelete(userId);
      if (!deleteuser) {
        return {
          status: 'error',
          message: 'Delete failed',
        };
      }
      return {
        data: deleteuser,
        message: 'Successfully',
      };
    } catch (error) {
      return 'Delete failed';
    }
  }

  async createStaff(staffDto: StaffDto): Promise<any> {
    try {
      const exists = await this.userModel.findOne({
        email: staffDto.email,
        role: EUserRole.Staff,
      });
      if (exists) throw new ConflictException('Staff already exists');

      const createstaff = await new this.userModel(staffDto);
      await createstaff.save();
      if (!createstaff) {
        return {
          status: 'error',
          message: 'create staff failed',
        };
      }
      return {
        data: createstaff.save(),
        message: 'Successfully',
      };
    } catch (error) {
      return error.response;
    }
  }

  async getAllStaff(): Promise<any> {
    const getall = await this.userModel.find({ role: EUserRole.Staff });
    return getall;
  }

  async getStaff(staffId: any): Promise<any> {
    try {
      const getstaff = await this.userModel.findById(staffId);
      if (!getstaff) {
        return {
          status: 'error',
          message: 'Staff not available',
        };
      }
      return getstaff;
    } catch (error) {
      console.error('Error finding staff:', error);
      return {
        status: 'error',
        message: 'Staff not available',
      };
    }
  }
}
