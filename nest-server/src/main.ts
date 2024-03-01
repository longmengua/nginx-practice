import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import { WsAdapter } from '@nestjs/platform-ws'

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useWebSocketAdapter(new WsAdapter(app));

  // // Enable CORS
  // app.enableCors({
  //   origin: '*',
  //   methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  //   allowedHeaders: 'Content-Type, Accept',
  //   preflightContinue: false,
  //   optionsSuccessStatus: 204,
  // });

  // Uncomment these lines to use the Redis adapter:
  // const redisIoAdapter = new RedisIoAdapter(app);
  // await redisIoAdapter.connectToRedis();
  // app.useWebSocketAdapter(redisIoAdapter);

  await app.listen(8000);
  Logger.log(`running on: ${await app.getUrl()}`, "Application");
}
bootstrap();
