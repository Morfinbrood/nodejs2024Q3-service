import { NestFactory } from '@nestjs/core';
import { AppModule } from '../src/app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as fs from 'fs';
import * as path from 'path';
import * as yaml from 'js-yaml';

async function generateSwaggerYaml() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Home Library Service')
    .setDescription('Home music library service')
    .setVersion('1.0.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);

  const swaggerYaml = yaml.dump(document);

  const docDir = path.join(__dirname, '../doc');

  if (!fs.existsSync(docDir)) {
    fs.mkdirSync(docDir, { recursive: true });
  }

  fs.writeFileSync(path.join(docDir, 'api.yaml'), swaggerYaml, 'utf8');

  console.log('Swagger YAML file generated successfully at doc/api.yaml');

  await app.close();
}

generateSwaggerYaml();
