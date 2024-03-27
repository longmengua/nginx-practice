# nginx-practice

## Note

- If using Docker containers to launch servers, you need to create a network for them; otherwise, they cannot connect to each other. There is a way to connect to another server without using an IP address, by using {container name}:{port}.
  - In this case, it is `nest-server:3000`.
- To test a WebSocket connection, use the following website:
  - [WebSocketKing](https://websocketking.com/)
    - In this case, the connecting URL will be `ws://localhost:80/websocket`.

## Docker

- Network
  - `docker network create nginx-net`
- Vue app
  - `docker build -t vue-app .`
  - `docker rm -f vue-app && docker run -d -p 80:80 --name vue-app --network nginx-net vue-app`
- Nest server
  - `docker build -t nest-server .`
  - `docker rm -f nest-server && docker run -d -p 3000:3000 --name nest-server --network nginx-net nest-server`
