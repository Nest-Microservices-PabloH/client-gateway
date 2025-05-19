import { NestFactory } from '@nestjs/core';
import { Logger, ValidationPipe } from '@nestjs/common';

import { AppModule } from './app.module';
import { RpcExceptionFilter } from './common';
import { envs } from './config';

async function bootstrap() {

  const logger = new Logger('Main-Gateway');
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api');

  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    transform: true,
    forbidNonWhitelisted: true,
  }));

  app.useGlobalFilters(new RpcExceptionFilter());

  await app.listen(envs.PORT ?? 3000);

  logger.log(`Gateway is running on port ${envs.PORT}`);

}
bootstrap();
