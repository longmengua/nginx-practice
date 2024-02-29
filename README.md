# nginx-practice

## note

- if using docker container to launch servers, then you need to create network for them, otherwise cannot connect to each, and there is a way without ip address to connect to another server, using {container name}:{port}
  - in this case, it is nest-server:3000

## docker

- network
  - docker network create nginx-net
- vue-app
  - docker build -t vue-app .
  - docker rm -f vue-app && docker run -d -p 80:80 --name vue-app --network nginx-net vue-app 
- nest-server
  - docker build -t nest-server .
  - docker rm -f nest-server && docker run -d -p 3000:3000 --name nest-server --network nginx-net nest-server
