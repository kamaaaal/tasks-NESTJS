import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { classToPlain, instanceToPlain } from 'class-transformer';

export interface Response<T> {
  data: T;
}

@Injectable()
export class TransformInterceptor
  implements NestInterceptor
{
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ) {
    return next.handle().pipe(map((data) =>  classToPlain(data)));
  }
}
