import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Otp } from 'src/database/core/otp.entity';
import { OtpService } from './otp.service';

@Module({
  imports: [TypeOrmModule.forFeature([Otp])],
  providers: [OtpService],
  exports: [OtpService],
})
export class OtpModule {}
