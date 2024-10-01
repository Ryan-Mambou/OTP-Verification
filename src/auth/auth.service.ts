import {
  BadRequestException,
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { OtpService } from 'src/otp/otp.service';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto, SignInDto } from 'src/user/user.dto';
import * as bcrypt from 'bcrypt';
import {
  generateExpiryDate,
  generateOtp,
} from 'src/common/utils/otp.generator';
import { MailingService } from 'src/mailing/mailing.service';
import { User } from 'src/database/core/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly otpService: OtpService,
    private readonly mailingService: MailingService,
    private readonly jwtService: JwtService,
  ) {}

  async signUp(createUserDto: CreateUserDto) {
    const { email, password, username } = createUserDto;
    const saltRounds = 10;

    const exitingUser = await this.userService.findByEmail(email);

    if (!exitingUser) {
      const hashedPassword = await bcrypt.hash(password, saltRounds);

      const newUser = await this.userService.createUser({
        email: email,
        password: hashedPassword,
        username: username,
      });

      const newOtp = generateOtp();
      const otpExpiresAt = generateExpiryDate();

      await this.otpService.createOtp({
        otp: newOtp,
        expiresAt: otpExpiresAt,
      });

      await this.mailingService.sendMail(email, 'Verify your email', newOtp);

      return newUser;
    } else {
      throw new ConflictException('User with this email already exists');
    }
  }

  async signIn(signInDto: SignInDto): Promise<{ accessToken: string }> {
    const { email, password } = signInDto;

    const user = await this.userService.findByEmail(email);

    if (!user) {
      throw new UnauthorizedException('This user does not exist');
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
      throw new UnauthorizedException('Incorrect password');
    }

    return {
      accessToken: this.jwtService.sign({ email: user.email, userId: user.id }),
    };
  }

  async validateUser(email: string, password: string): Promise<User> {
    const user = await this.userService.findByEmail(email);
    if (!user) {
      throw new UnauthorizedException('This user does not exist');
    }
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      throw new BadRequestException('Incorrect password');
    }
    return user;
  }
}
