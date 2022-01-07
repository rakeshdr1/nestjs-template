import { NestFactory } from '@nestjs/core';
import helmet from 'helmet';
import { AppModule } from './app.module';
import { setupSwagger } from './setup-swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });

  app.use(helmet());
  app.setGlobalPrefix('/api');
  setupSwagger(app);

  await app.listen(3000);
}
bootstrap();
