import { IsEmail, IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  readonly name: string;
  @IsEmail()
  readonly email: string;
  @IsString()
  readonly password: string;
  @IsString()
  readonly date_of_birth: string;
  @IsString()
  readonly number_phone: string;
  @IsString()
  readonly gender: string;
  @IsString()
  readonly image: string
  
}
