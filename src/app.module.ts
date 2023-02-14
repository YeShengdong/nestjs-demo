import { Module } from '@nestjs/common';
import { APP_INTERCEPTOR, APP_FILTER } from '@nestjs/core';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { swagger } from 'src/config';
import { ResponseFormatInterceptor } from './interceptors';
import { AllExceptionsFilter } from './exceptions/all-exceptions.filter';
import { AppController } from './app.controller';
import { AuthModule } from './services/auth/auth.module';
import { ExamplesModule } from './services/examples/examples.module';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, swagger.path),
      serveRoot: `/${swagger.path}`,
    }),
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
