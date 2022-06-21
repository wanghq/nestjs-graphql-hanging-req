import { Catch } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { GqlExceptionFilter } from '@nestjs/graphql';
import { AppModule } from './app.module';

export class CustomException extends Error {
  constructor() {
    super('CUSTOM EXCEPTION');
  }
}

@Catch(CustomException)
export class CustomExceptionFilter implements GqlExceptionFilter {
  public catch(): any {
    console.log('not being called from request scoped exception');

    return new Error('test');
  }
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new CustomExceptionFilter());
  await app.listen(3001);
}
bootstrap();
