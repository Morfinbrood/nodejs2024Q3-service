import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: false,
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Strip properties not defined in DTO
      forbidNonWhitelisted: true, // Throw error if unknown properties are present
      transform: true, // Automatically transform payloads to be objects typed according to their DTO classes
    }),
  );

  // Swagger configuration
  const config = new DocumentBuilder()
    .setTitle('Home Library Service')
    .setDescription('Home music library service')
    .setVersion('1.0.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  const port = process.env.PORT || 4000;
  await app.listen(port);
  console.log(`App started on port ${port}`);
  console.log(`Swagger available at http://localhost:${port}/api`);
}

bootstrap();
