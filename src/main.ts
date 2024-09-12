import { NestFactory } from '@nestjs/core';
import { json } from 'express';

import { AppModule } from './app.module';
import {
  HttpStatus,
  Logger,
  UnprocessableEntityException,
  ValidationPipe,
} from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { config } from 'dotenv';

config();

async function bootstrap() {
  const port = process.env.PORT;
  const host = process.env.SYSTEM_HOST;

  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api/v1');
  app.enableCors();
  app.use(json({ limit: '2mb' }));

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
      transform: true,
      dismissDefaultMessages: true,
      forbidNonWhitelisted: true,
      exceptionFactory: (errors) => {
        const errorMessages = errors.map((error) => {
          const constraints = error.constraints;
          const keys = Object.keys(constraints);
          return {
            [error.property]: keys.map((key) => constraints[key]),
          };
        });
        return new UnprocessableEntityException({
          errors: errorMessages.reduce(
            (acc, error) => ({ ...acc, ...error }),
            {},
          ),
        });
      },
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('Boilerplate App')
    .setDescription('Boilerplate app API description ')
    .setVersion('1.0')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
      'JWT',
    )
    .build();
  const document = SwaggerModule.createDocument(app, config);
  const options = {
    swaggerOptions: {
      persistAuthorization: true,
    },
    customJs: [
      `window.onload = function() {
        const key = 'swagger_auth';
        const auth = JSON.parse(localStorage.getItem(key) || '{}');
        const ui = window.ui;
        if (auth) {
          ui.preauthorizeBasic(key, auth);
        }
        ui.initOAuth({
          clientId: 'your-client-id',
          clientSecret: 'your-client-secret',
          realm: 'your-realms',
          appName: 'Finance App',
        });
        ui.authActions.preauthorizeApiKey('JWT', auth.bearer);
      };`,
    ],
  };
  SwaggerModule.setup('api-doc', app, document, options);

  await app.listen(port);

  Logger.log(
    `Server is Running(🔥) on http://${host}:${port}/`,
    'Boilerplate app',
  );
  Logger.log(
    `Swagger API Collection(🔥) on http://${host}:${port}/api-doc/`,
    'Boilerplate app',
  );
}
bootstrap();
