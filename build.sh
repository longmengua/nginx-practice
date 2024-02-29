
function launchVueApp {
  cd vue-app
  docker build -t vue-app .
  docker run -d -p 80:80 --name vue-app vue-app
}

function launchNestServer {
  cd nest-server
  docker build -t nest-server .
  docker run -d -p 3000:3000 --name nest-server nest-server
}

launchVueApp
launchNestServer