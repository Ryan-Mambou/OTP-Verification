import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Otp } from 'src/database/core/otp.entity';
import { CreateOtpDto } from './otp.dtos';

@Injectable()
export class OtpService {
  constructor(@InjectRepository(Otp) private otpRepository: Repository<Otp>) {}

  async createOtp(createOtp: CreateOtpDto): Promise<Otp> {
    const otp = this.otpRepository.create(createOtp);
    await this.otpRepository.save(otp);
    return otp;
  }

  async findByOtp(otp: string): Promise<Otp> {
    const otpFound = await this.otpRepository.findOne({
      where: { otp },
    });

    if (!otpFound) {
      throw new NotFoundException('Otp not found');
    }
    return otpFound;
  }
}
