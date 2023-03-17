import { Module } from '@nestjs/common';
import { APP_INTERCEPTOR, APP_FILTER } from '@nestjs/core';
import { ResponseFormatInterceptor } from './interceptors';
import { AllExceptionsFilter } from './exceptions/all-exceptions.filter';
import { AppController } from './app.controller';
import { ConfigModule } from './config';
import { ServeStaticModule } from './serve-static';
import { DatabaseModule } from './database';
import { AuthModule } from './services/auth/auth.module';
import { ExamplesModule } from './services/examples/examples.module';

@Module({
  imports: [
    ConfigModule,
    ServeStaticModule,
    DatabaseModule,
    AuthModule,
    ExamplesModule,
  ],
  controllers: [AppController],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: ResponseFormatInterceptor,
    },
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter,
    },
  ],
})
export class AppModule {}
