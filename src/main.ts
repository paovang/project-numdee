import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {
  I18nMiddleware,
  I18nValidationExceptionFilter,
  I18nValidationPipe,
} from 'nestjs-i18n';
import { NestExpressApplication } from '@nestjs/platform-express';


async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.enableCors({ origin: '*' });   

  app.useGlobalPipes(
    new I18nValidationPipe({
      transform: true,
    }),
  );
  app.useGlobalFilters(
    new I18nValidationExceptionFilter({
      detailedErrors: false,
    }),
  );
  app.use(I18nMiddleware);

  app.setGlobalPrefix('api');
  
  await app.listen(3000);
}
bootstrap();
