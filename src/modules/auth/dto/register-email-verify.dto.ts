import { IsEmail, IsString } from 'class-validator';

export class RegisterEmailVerifyDto {
  @IsEmail()
  readonly email: string;

  @IsString()
  readonly code: string;
}

export class ForgotPasswordEmailVerifyDto {
  @IsEmail()
  readonly email: string;

  @IsString()
  readonly code: string;
}
