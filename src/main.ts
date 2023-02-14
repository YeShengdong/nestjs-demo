import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { NestExpressApplication } from '@nestjs/platform-express';
import { swagger } from 'src/config';
import { AppModule } from './app.module';

function setupSwaggerModule(app: NestExpressApplication) {
  const { title, description, version, path } = swagger;
  const config = new DocumentBuilder()
    .setTitle(title)
    .setDescription(description)
    .setVersion(version)
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup(path, app, document);
}

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  setupSwaggerModule(app);

  await app.listen(3000);
}

bootstrap();
