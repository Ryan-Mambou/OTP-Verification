import { Controller, Param, Get } from '@nestjs/common';
import { OtpService } from './otp.service';

@Controller('otp')
export class OtpController {
  constructor(private otpService: OtpService) {}

  @Get('/verify/:otp')
  async verifyOtp(@Param('otp') otp: string): Promise<Boolean> {
    return this.otpService.verifyOtp(otp);
  }
}
