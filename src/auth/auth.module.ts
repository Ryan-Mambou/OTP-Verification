import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { OtpModule } from 'src/otp/otp.module';
import { UserModule } from 'src/user/user.module';
import { MailingModule } from 'src/mailing/mailing.module';

@Module({
  imports: [UserModule, OtpModule, MailingModule],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
