import 'module-alias/register';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { boldGreenPrint } from './shared/utils';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // удаляет свойства, не указанные в DTO
      forbidNonWhitelisted: true, // выбрасывает ошибку, если приходят неизвестные свойства
      transform: true, // автоматически преобразует входящие данные в типы, указанные в DTO
    }),
  );

  const port = process.env.PORT || 4000;
  await app.listen(port);
  console.log(boldGreenPrint(`App started on port ${port}`));
}
bootstrap();
