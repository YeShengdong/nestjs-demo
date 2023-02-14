import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { IResponseFormat } from './response-format';

@Injectable()
export class ResponseFormatInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<IResponseFormat> {
    return next.handle().pipe(
      map((data) => {
        if (data.code && data.message) {
          return data;
        }

        return {
          code: 0,
          message: '',
          data,
        };
      }),
    );
  }
}
