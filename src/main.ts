import { ArgumentsHost, Catch } from '@nestjs/common';
import {
  BaseExceptionFilter,
  HttpAdapterHost,
  NestFactory,
} from '@nestjs/core';
import { AppModule } from './app.module';

export class CustomException extends Error {
  constructor() {
    super('CUSTOM EXCEPTION');
  }
}

@Catch()
export class AllExceptionsFilter extends BaseExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    super.catch(exception, host);
  }
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // const { httpAdapter } = app.get(HttpAdapterHost);
  // app.useGlobalFilters(new AllExceptionsFilter(httpAdapter));
  await app.listen(3001);
}
bootstrap();
