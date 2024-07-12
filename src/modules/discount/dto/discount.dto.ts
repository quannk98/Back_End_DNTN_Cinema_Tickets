import { IsArray, IsNumber, IsString } from 'class-validator';

export class DiscountDto {
  @IsString()
  readonly name: string;

  @IsString()
  readonly image: string;

  @IsNumber()
  readonly percent: number;

  @IsString()
  readonly code: string;

  @IsArray({ each: true })
  readonly cinema: string;

  @IsString()
  readonly dayStart: string;

  @IsString()
  readonly dayEnd: string;
}
