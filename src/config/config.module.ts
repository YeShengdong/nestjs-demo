import { Module } from '@nestjs/common';
import { ConfigModule as NestConfigModule } from '@nestjs/config';
import { join } from 'path';
import { validationSchema } from './validation.schema';
import { getNodeEnv } from './config.utils';
import commonConfig from './common.config';
import databaseConfig from './database.config';
import swaggerConfig from './swagger.config';
import corsConfig from './cors.config';
import authConfig from './auth.config';

@Module({
  imports: [
    NestConfigModule.forRoot({
      isGlobal: true,
      envFilePath: join(process.cwd(), `.env.${getNodeEnv()}`),
      load: [
        commonConfig,
        databaseConfig,
        authConfig,
        swaggerConfig,
        corsConfig,
      ],
      validationSchema,
    }),
  ],
})
export class ConfigModule {}
