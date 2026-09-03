import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ENV } from './config/env';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const port = ENV.PORT || 3000;
  await app.listen(port);
}

void bootstrap();
