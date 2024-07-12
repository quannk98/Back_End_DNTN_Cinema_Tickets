import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { DiscountDto } from 'src/modules/discount/dto/discount.dto';
import { Discount } from 'src/schemas/discount.schema';


@Injectable()
export class DiscountReponsitory {
  constructor(
    @InjectModel(Discount.name) private readonly discountModel: Model<Discount>,
    @InjectModel(Notification.name)
    private readonly notificationModel: Model<Notification>,
  ) {}
  async create(discountDto: DiscountDto): Promise<any> {
    try {
      const existsdiscount = await this.discountModel.findOne({
        name: discountDto.name,
      });
      if (existsdiscount)
        throw new ConflictException('Discount already exists');
      const dataCreate = {
        ...discountDto,
        dayStart: new Date(discountDto.dayStart),
        dayEnd: new Date(discountDto.dayEnd),
      };
      const creatediscount = new this.discountModel(dataCreate);
      if (!creatediscount) throw new UnauthorizedException('Create Fail');
      const datanotification = {
        name: discountDto.name,
        dayStart: discountDto.dayStart,
        dayEnd: discountDto.dayEnd,
      };
      const createnotification = new this.notificationModel(datanotification);
      createnotification.save();
      return creatediscount;
    } catch (error) {
      return error.message;
    }
  }

  async getAll(): Promise<any> {
    const getAll = await this.discountModel
      .find({})
      .populate([{ path: 'cinema', select: 'name address hotline' }]);
    return getAll;
  }
  async getDiscount(discountId: any): Promise<any> {
    const getDiscount = await this.discountModel
      .findById(discountId)
      .populate([{ path: 'cinema', select: 'name address hotline' }]);
    if (!getDiscount) {
      return {
      
        message: 'Get Failed',
      };
    }
    return getDiscount;
  }

  async getDiscountByType(type: any): Promise<any> {
    const getDiscount = await this.discountModel
      .find({ type: type })
      .populate([{ path: 'cinema', select: 'name address hotline' }]);
    if (!getDiscount) {
      return {
        
        message: 'Get Failed',
      };
    }
    return getDiscount;
  }

  async updateDiscount(discountId: any, dataUpdate: any): Promise<any> {
    if (dataUpdate.dayStart != undefined && dataUpdate.dayEnd != undefined) {
      const data = {
        ...dataUpdate,
        dayStart: new Date(dataUpdate.dayStart),
        dayEnd: new Date(dataUpdate.dayEnd),
      };
      const update = await this.discountModel.findByIdAndUpdate(
        discountId,
        data,
        {
          new: true,
        },
      );
      if (!update) {
        return {
         
          message: 'Update Failed',
        };
      }
      return update;
    } else if (dataUpdate.dayStart != undefined) {
      const data = {
        ...dataUpdate,
        dayStart: new Date(dataUpdate.dayStart),
      };
      const update = await this.discountModel.findByIdAndUpdate(
        discountId,
        data,
        {
          new: true,
        },
      );
      if (!update) {
        return {
        
          message: 'Update Failed',
        };
      }
      return update;
    } else if (dataUpdate.dayEnd != undefined) {
      const data = {
        ...dataUpdate,
        dayEnd: new Date(dataUpdate.dayEnd),
      };
      const update = await this.discountModel.findByIdAndUpdate(
        discountId,
        data,
        {
          new: true,
        },
      );
      if (!update) {
        return {
         
          message: 'Update Failed',
        };
      }
      return update;
    }
    const update = await this.discountModel.findByIdAndUpdate(
      discountId,
      dataUpdate,
      {
        new: true,
      },
    );
    if (!update) {
      return {
      
        message: 'Update Failed',
      };
    }
    return update;
  }

  async deleteDiscount(discountId: any): Promise<any> {
    const deletediscount =
      await this.discountModel.findByIdAndDelete(discountId);
    if (!deletediscount) {
      return {
      
        message: 'Delete Failed',
      };
    }
    return deletediscount;
  }
}
