import { Injectable } from "@nestjs/common";
import { DiscountReponsitory } from "src/repositories/discount.reponsitory";
import { DiscountDto } from "./dto/discount.dto";

@Injectable()
export class DiscountService{
    constructor(private readonly discountReponsitory: DiscountReponsitory){}
    async createDiscount(discountDto: DiscountDto): Promise<any> {
        const time = await this.discountReponsitory.create(discountDto);
        return time.data;
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
    
      async updateDiscount(discountId: any, dataUpdate): Promise<any> {
        const update = await this.discountReponsitory.updateDiscount(discountId,dataUpdate
         );
        return update;
      }
    
      async deleteDiscount(discountId: any): Promise<any> {
        const deleteDiscount = await this.discountReponsitory.deleteDiscount(discountId);
        return deleteDiscount;
      }
}