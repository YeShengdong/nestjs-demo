import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { successCodeMessageMapping } from '../exceptions/code';

@Injectable()
export class ResponseFormatInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<IResponseFormat> {
    return next.handle().pipe(
      map((data) => {
        if (data?.code && data?.message) {
          return data;
        }

        const operationSucceededCode = 20001;

        return {
          code: operationSucceededCode,
          message: successCodeMessageMapping[operationSucceededCode],
          data,
        };
      }),
    );
  }
}
