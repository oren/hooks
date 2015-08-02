# hooks

Web service that recieves github web hooks

## Setup on laptop

    sudo sh -c "echo '127.0.0.1 laptop-hooks.my-server.com' >> /etc/hosts"

## Run

    bin/build
    bin/run

## Test

curl https://laptop-hooks.my-server.com/health
