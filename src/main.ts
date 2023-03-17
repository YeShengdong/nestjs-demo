import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ConfigService } from '@nestjs/config';
import { VersioningType } from '@nestjs/common';
import { AppModule } from './app.module';

function setupVersioning(app: NestExpressApplication) {
  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: '1',
  });
}

function setupSwaggerModule(
  app: NestExpressApplication,
  configService: ConfigService,
) {
  const { title, description, version, path, server } =
    configService.get('swagger');
  const config = new DocumentBuilder()
    .setTitle(title)
    .setDescription(description)
    .setVersion(version)
    .addBearerAuth();

  if (server) {
    config.addServer(server);
  }

  const document = SwaggerModule.createDocument(app, config.build());
  SwaggerModule.setup(path, app, document);
}

function setupCORS(app: NestExpressApplication, configService: ConfigService) {
  app.enableCors(configService.get('cors'));
}

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const configService = app.get(ConfigService);

  setupVersioning(app);
  setupSwaggerModule(app, configService);
  setupCORS(app, configService);

  await app.listen(3000);
}

bootstrap();
