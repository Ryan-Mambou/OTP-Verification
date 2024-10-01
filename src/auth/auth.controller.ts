import { Controller, Body, Post, UseGuards, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto, SignInDto } from 'src/user/user.dto';
import { Serialize } from 'src/common/serializers/serializer.interceptor';
import { LocalAuthGuard } from 'src/common/guards/local-auth.guard';
import { AuthGuard } from '@nestjs/passport';
import { AuthenficationGuard } from 'src/common/guards/authentication.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Serialize(CreateUserDto)
  @Post('/signup')
  async signUp(@Body() createUserDto: CreateUserDto) {
    return await this.authService.signUp(createUserDto);
  }

  // @Post('/login')
  // async signIn(@Body() signInDto: SignInDto) {
  //   return await this.authService.signIn(signInDto);
  // }

  //This authentication method is to be used with AuthGuard from nestjs/passport
  //@Post('/any route that requires authentication')
  //@UseGuards(AuthGuard('local'))
  // async signIn(@Request() req) {
  //   return await this.authService.signIn(req.user);
  // }

  // This authentication method is to be used with custom AuthGuard
  // @Post('/any route that requires authentication')
  // @UseGuards(AuthenficationGuard)
  // async signIn(@Request() req) {
  //   return await this.authService.signIn(req.user);
  // }
}
