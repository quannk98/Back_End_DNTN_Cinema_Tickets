import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AdminDto } from 'src/modules/auth/dto/admin.dto';
import { Admin } from 'src/schemas/admin.schema';

@Injectable()
export class AdminReponsitory {
  constructor(
    @InjectModel(Admin.name) private readonly adminModel: Model<Admin>,
  ) {}
  async createAdmin(adminDto: AdminDto): Promise<any> {
    try {
      const createadmin = new this.adminModel(adminDto);
      if (!createadmin) throw new UnauthorizedException('Create Fail');
      return {
        data: createadmin.save(),
        message: 'Successfully',
      };
    } catch (error) {
      return error.response;
    }
  }
  async loginAdmin(name: string): Promise<any> {
    const exitsAdmin = await this.adminModel.findOne({ name: name });
    if (!exitsAdmin) {
      return {
        status: 'error',
        message: 'Login Failed',
      };
    }
    return {
      data: exitsAdmin,
      message: 'Successfully',
    };
  }
}
