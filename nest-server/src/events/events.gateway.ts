import { Logger } from '@nestjs/common';
import { WebSocketGateway, WebSocketServer, SubscribeMessage, MessageBody, OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit } from '@nestjs/websockets';
// import { Server } from 'socket.io';
import { Server } from 'ws';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class EventsGateway implements OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit {
  @WebSocketServer()
  server: Server;

  afterInit(server: any) {
    Logger.log('create successfully!', "Websocket");
  }

  handleConnection(client: WebSocket) {
    Logger.log('Client connected', "Websocket");
    // You can do something when a client connects, such as sending initial data
  }

  handleDisconnect(client: WebSocket) {
    Logger.log('Client disconnected', "Websocket");
    // You can do something when a client disconnects
  }

  @SubscribeMessage('message')
  handleMessage(@MessageBody() data: any): void {
    Logger.log(`Received message: ${JSON.stringify((data))}`, "Websocket");
    // Handle the received message here
  }
}
