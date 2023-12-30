import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { Config } from './config';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe, VersioningType } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableVersioning({
    defaultVersion: '1',
    type: VersioningType.URI,
    prefix: 'api/v',
  });

  const config = new DocumentBuilder()
    .setTitle('NestJS API')
    .setDescription('API description')
    .setVersion('0.0.1')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  app.useGlobalPipes(new ValidationPipe({}));

  const configService = app.get(ConfigService);
  app.enableCors({
    origin: new RegExp('(.*)'),
    credentials: true,
  });

  await app.listen(configService.get(Config.PORT));
}
bootstrap();
