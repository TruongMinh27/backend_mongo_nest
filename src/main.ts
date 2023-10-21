import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import config from 'config';
import { TransformationInterceptor } from './responseInterceptor';
import cookieParser from 'cookie-parser';
import { NextFunction, raw, Request, Response } from 'express';
import csurf from 'csurf';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
const ROOT_IGNORED_PATHS = ['/api/v1/orders/webhook'];

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { rawBody: true });
  // app.enableCors();

  app.use('/api/v1/orders/webhook', raw({ type: '*/*' }));

  app.use(cookieParser());
  const csrfMiddleware = csurf({
    cookie: true,
  });

  app.use((req: Request, res: Response, next: NextFunction) => {
    if (ROOT_IGNORED_PATHS.includes(req.path)) {
      return next();
    }
    return csrfMiddleware(req, res, next);
  });
  app.setGlobalPrefix(config.get('appPrefix'));
  app.useGlobalInterceptors(new TransformationInterceptor());
  const setting = new DocumentBuilder()
    .setTitle('HVUH LATN SWAGGER by Minh')
    .setDescription('API dùng cho luận án ')
    .setVersion('1.0')
    .addTag('All tests')
    .build();
  const document = SwaggerModule.createDocument(app, setting);
  SwaggerModule.setup('api', app, document);
  await app.listen(config.get('port'), () => {
    return console.log(`Server is running on port ${config.get('port')}`);
  });
}
bootstrap();
