#!/bin/sh

# start docker desktop from the terminal (optional)

sudo systemctl --user start docker

# create the docker network

docker network rm mynetwork

docker network create --driver bridge mynetwork


# pull the db image and run in the network

docker pull postgres

docker run -d --name pg_instance --network mynetwork -p 5432:5432 -e POSTGRES_PASSWORD=pass -e POSTGRES_USER=user -e POSTGRES_DB=db -e POSTGRES_HOST=mynetwork -e POSTGRES_PORT=5432 postgres


# build the backend image and run in the network

# specify the path of dockerfile if not in the current directory
docker build -t movie_backend .

# specify the backend env vars as specified in the above command of pg_instance (POSTGRES_HOST will be name of the pg container; here it is pg_instance)
docker run -it --name backend-instance --network mynetwork -p 3003:3002 -e server_port=3002 movie_backend

