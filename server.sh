function display_error {
    echo "Error: $1"
    exit 1
}

function common_steps {
    # Step 1
    # echo "===> Start pull code from $1 branch"
    git fetch
    # git checkout $1
    git pull

    # Step 2
    echo "===> Check version in package.json"
    json_file="./nest-server/package.json"
    if [ ! -f "$json_file" ]; then
        display_error "File not found: $json_file"
    fi

    version=$(grep '"version":' "$json_file" | sed -E 's/.*"version": *"([^"]+).*/\1/')
    echo -e "\nVersion: $version\n"
}

function launchNestServer {
  cd nest-server
  docker build -t nest-server .
  docker rm -f nest-server && docker run -d -p 3000:3000 -p 3001:3001 --name nest-server --network nginx-net nest-server
}

common_steps
launchNestServer