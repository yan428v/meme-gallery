import { DocumentBuilder, SwaggerModule, OpenAPIObject } from '@nestjs/swagger';
import { INestApplication } from '@nestjs/common';

export function setupSwagger(app: INestApplication): void {
  const config = new DocumentBuilder()
    .setTitle('Meme Gallery API')
    .setDescription('API for managing memes')
    .setVersion('1.0')
    .build();

  const document: OpenAPIObject = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);
}
