import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import {DocumentBuilder, SwaggerModule} from "@nestjs/swagger";
import type {
  CorsConfig,
  NestConfig,
  SwaggerConfig,
} from 'configs/config.interface';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);
  const nestConfig = configService.get<NestConfig>('nest');
  const corsConfig = configService.get<CorsConfig>('cors');
  const swaggerConfig = configService.get<SwaggerConfig>('swagger');

  // Swagger Docs
  if (swaggerConfig.enabled) {
    const options = new DocumentBuilder()
        .setTitle(swaggerConfig.title || 'Nestjs')
        .setDescription(swaggerConfig.description || 'The nestjs API description')
        .setVersion(swaggerConfig.version || '1.0')
        .build();
    const document = SwaggerModule.createDocument(app, options);

    SwaggerModule.setup(swaggerConfig.path || 'docs', app, document);
  }

  // Cors
  if (corsConfig.enabled) {
    app.enableCors();
  }

  await app.listen(process.env.PORT || nestConfig.port || 3000);
}
bootstrap();