
function launchVueApp {
  cd vue-app
  docker build -t vue-app .
  docker rm -f vue-app && docker run -d -p 80:80 --name vue-app vue-app
}

launchVueApp