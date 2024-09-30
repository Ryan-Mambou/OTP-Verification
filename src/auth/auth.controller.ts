import { Controller, Body, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto, SignInDto } from 'src/user/user.dto';
import { GeneralUserDto } from 'src/user/user.dto';
import { Serialize } from 'src/common/serializers/serializer.interceptor';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Serialize(CreateUserDto)
  @Post('/signup')
  async signUp(@Body() createUserDto: CreateUserDto) {
    return await this.authService.signUp(createUserDto);
  }

  @Post('/login')
  async signIn(@Body() signInDto: SignInDto) {
    return await this.authService.signIn(signInDto);
  }
}
