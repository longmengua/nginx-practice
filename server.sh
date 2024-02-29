function launchNestServer {
  cd nest-server
  docker build -t nest-server .
  docker rm -f nest-server && docker run -d -p 3000:3000 --name nest-server nest-server
}

launchNestServer