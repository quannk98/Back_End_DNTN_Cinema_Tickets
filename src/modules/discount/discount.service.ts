import { Injectable } from '@nestjs/common';

import { DiscountDto } from './dto/discount.dto';
import { DiscountReponsitory } from 'src/reponsitorys/discount.reponsitory';

@Injectable()
export class DiscountService {
  constructor(private readonly discountReponsitory: DiscountReponsitory) {}
  async createDiscount(discountDto: DiscountDto): Promise<any> {
    const discount = await this.discountReponsitory.create(discountDto);
    return discount;
  }

  async getAll(): Promise<any> {
    const getall = await this.discountReponsitory.getAll();
    return getall;
  }
  async getdiscount(discountId: any): Promise<any> {
    const getDiscount = await this.discountReponsitory.getDiscount(discountId);
    return getDiscount;
  }

  async getdiscountbytype(type: any): Promise<any> {
    const getDiscount = await this.discountReponsitory.getDiscountByType(type);
    return getDiscount;
  }
  async checkCodeDiscount(code:any,cinemaId:any): Promise<any>{
    const discount = await this.discountReponsitory.checkCodeDiscount(code,cinemaId)
    return discount
  }

  async updateDiscountStatus(discountId: any): Promise<any> {
    const update =
      await this.discountReponsitory.UpdateStatusDiscount(discountId);
    return update;
  }

  async updateDiscount(discountId: any, dataUpdate): Promise<any> {
    const update = await this.discountReponsitory.updateDiscount(
      discountId,
      dataUpdate,
    );
    return update;
  }

  async deleteDiscount(discountId: any): Promise<any> {
    const deleteDiscount =
      await this.discountReponsitory.deleteDiscount(discountId);
    return deleteDiscount;
  }
}
