import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import {DocumentBuilder, SwaggerModule} from "@nestjs/swagger";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // Swagger Docs
  const options = new DocumentBuilder()
      .setTitle('Nestjs')
      .setDescription('The nestjs API description')
      .setVersion('1.0')
      .build();
  const document = SwaggerModule.createDocument(app, options);

  SwaggerModule.setup('docs', app, document);

 app.enableCors();


  await app.listen(process.env.PORT || 9000);
}
bootstrap();