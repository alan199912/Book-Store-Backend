import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // * to access an endpoint to...
  // * /api/endpointName
  app.setGlobalPrefix('api');

  await app.listen(AppModule.port);
}
bootstrap();
