import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import { IErrorResponseFormat } from 'src/interceptors/response-format';
import { errorCodeMessageMapping } from 'src/config';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

  catch(exception: unknown, host: ArgumentsHost): void {
    const { httpAdapter } = this.httpAdapterHost;
    const ctx = host.switchToHttp();
    const responseBody = this.getResponseBody(exception);

    httpAdapter.reply(ctx.getResponse(), responseBody, responseBody.statusCode);
  }

  private getResponseBody(exception: unknown): IErrorResponseFormat {
    if (exception instanceof HttpException) {
      const exceptionResponse = exception.getResponse();
      const statusCode = exception.getStatus();

      if (typeof exceptionResponse === 'string') {
        return {
          statusCode,
          message: exceptionResponse,
        };
      }

      const { message: code = null } = exceptionResponse as any;
      const errorCodeMessage = errorCodeMessageMapping[code];

      if (errorCodeMessage) {
        return {
          statusCode,
          code,
          message: errorCodeMessage,
        };
      }

      return exceptionResponse as IErrorResponseFormat;
    }

    const internalServerErrorCode = HttpStatus.INTERNAL_SERVER_ERROR;

    return {
      statusCode: internalServerErrorCode,
      message: errorCodeMessageMapping[internalServerErrorCode],
    };
  }
}
