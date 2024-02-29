import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ChatGateway } from './chat/chat.gateway';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly chatGateway: ChatGateway
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get("api")
  getHello2(): string {
    return `${this.appService.getHello()}2`;
  }

  @Get("message")
  sendMessage(): string {
      this.chatGateway.server.emit('message', 'Hello from WebSocket!');
      return 'Message sent';
  }
}
