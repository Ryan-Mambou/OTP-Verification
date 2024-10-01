import { AuthGuard } from '@nestjs/passport';

//This guard is to be used with AuthGuard from nestjs/passport
export class LocalAuthGuard extends AuthGuard('local') {}
