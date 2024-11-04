import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(2000, () => {
    console.log('App listening on port 2000');
  });
}
bootstrap();