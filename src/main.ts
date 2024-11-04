import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = process.env.PORT || 3000; // Default to 3000 if PORT is not defined
  await app.listen(port, () => {
    console.log(`App listening on port ${port}`);
  });
}
bootstrap();
