import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class MailingService {
  constructor(private mailerService: MailerService) {}

  async sendMail(to: string, subject: string, body: string) {
    const mailOptions = {
      from: 'noreply@otp-verification.com',
      to: to,
      subject: subject,
      text: `This is your verification code: ${body}`,
    };

    await this.mailerService.sendMail(mailOptions);
  }
}
