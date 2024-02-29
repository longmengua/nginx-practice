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
    echo "===> Check version in composer.json"
    json_file="./composer.json"
    if [ ! -f "$json_file" ]; then
        display_error "File not found: $json_file"
    fi

    version=$(grep '"version":' "$json_file" | sed -E 's/.*"version": *"([^"]+).*/\1/')
    echo -e "\nVersion: $version\n"
}

function launchVueApp {
  cd vue-app
  docker build -t vue-app .
  docker rm -f vue-app && docker run -d -p 80:80 --name vue-app --network nginx-net vue-app 
}

common_steps
launchVueApp