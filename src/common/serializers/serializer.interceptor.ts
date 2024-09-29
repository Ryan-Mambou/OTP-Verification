import {
  applyDecorators,
  CallHandler,
  UseInterceptors,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { ClassConstructor, plainToClass } from 'class-transformer';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export function Serialize<T>(dto: ClassConstructor<T>) {
  return applyDecorators(UseInterceptors(new SerializerInterceptor(dto)));
}

@Injectable()
export class SerializerInterceptor<T> implements NestInterceptor {
  constructor(private readonly dto: ClassConstructor<T>) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<T> {
    return next.handle().pipe(
      map((data: any) => {
        return plainToClass(this.dto, data, { excludeExtraneousValues: true });
      }),
    );
  }
}
