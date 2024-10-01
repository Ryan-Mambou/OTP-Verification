import { Controller, Body, Post, UseGuards, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto, SignInDto } from 'src/user/user.dto';
import { Serialize } from 'src/common/serializers/serializer.interceptor';
import { LocalAuthGuard } from 'src/common/guards/local-auth.guard';
import { AuthGuard } from '@nestjs/passport';

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

  //@UseGuards(AuthGuard('local'))
  // async signIn(@Request() req) {
  //   return await this.authService.signIn(req.user);
  // }
}
