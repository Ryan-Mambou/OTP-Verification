import { IsDate, IsString } from 'class-validator';

export class CreateOtpDto {
  @IsString()
  otp: string;

  @IsDate()
  expiresAt: Date;
}
