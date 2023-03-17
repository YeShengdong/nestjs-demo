import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ServeStaticModule as NestServeStaticModule } from '@nestjs/serve-static';
import { ServeStaticModuleAsyncOptions } from '@nestjs/serve-static/dist/interfaces/serve-static-options.interface';
import { join } from 'path';

function getServeConfig(): ServeStaticModuleAsyncOptions {
  return {
    useFactory: (configService: ConfigService) => {
      const path = configService.get('swagger.path');

      return [
        {
          rootPath: join(__dirname, path),
          serveRoot: `/${path}`,
        },
      ];
    },
    inject: [ConfigService],
  };
}

@Module({
  imports: [NestServeStaticModule.forRootAsync(getServeConfig())],
})
export class ServeStaticModule {}
