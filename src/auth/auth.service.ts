import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { CreateUserDto, SignInDto } from 'src/user/user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private userService: UserService) {}

  async signUp(createUserDto: CreateUserDto) {
    const { email, password, username } = createUserDto;
    const saltRounds = 10;

    const exitingUser = await this.userService.findByEmail(email);

    if (!exitingUser) {
      const hashedPassword = await bcrypt.hash(password, saltRounds);
      console.log(hashedPassword);
      const newUser = await this.userService.createUser({
        email: email,
        password: hashedPassword,
        username: username,
      });
      return newUser;
    } else {
      throw new ConflictException('User with this email already exists');
    }
  }

  async signIn(signInDto: SignInDto) {
    const { email, password } = signInDto;

    const user = await this.userService.findByEmail(email);

    if (!user) {
      throw new UnauthorizedException('This user does not exist');
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
      throw new UnauthorizedException('Incorrect password');
    }

    return user;
  }
}
