import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );

  const configService: ConfigService = app.get(ConfigService);

  const port = configService.get('SERVER_PORT');

  await app.listen(port, () => {
    console.log(`Server running on port http://localhost:${port}/`);
  });
}
bootstrap();
