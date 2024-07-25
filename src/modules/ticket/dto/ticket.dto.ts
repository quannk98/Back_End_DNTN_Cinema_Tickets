import { IsArray, IsNumber, IsString, ValidateNested } from 'class-validator';

export class TicketDto {
  @IsArray()
  readonly discount: string;

  @IsArray({ each: true })
  readonly seat: string;

  @IsString({ each: true })
  readonly user: string;

  @IsArray()
  @ValidateNested({ each: true })
  readonly food: FoodItem[];

  @IsString()
  readonly showdate: string;

  @IsString()
  readonly showtime: string;

  @IsNumber()
  readonly total_food: number;

  @IsNumber()
  readonly total: number;
}
class FoodItem {
  @IsString()
  readonly foodId: string;

  @IsNumber()
  readonly quantity: number;
}
