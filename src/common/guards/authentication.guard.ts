import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { CanActivate } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';

//This guard is a custom guard
@Injectable()
export class AuthenficationGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    try {
      const request = context.switchToHttp().getRequest();
      const token = request.headers.authorization.split(' ')[1];
      if (!token) {
        throw new UnauthorizedException('No token!');
      }
      console.log('TESTTTTT', this.jwtService.decode(token));
      request.user = this.jwtService.verify(token);
    } catch (err) {
      throw new UnauthorizedException('Invalid token!');
    }
    return true;
  }
}
