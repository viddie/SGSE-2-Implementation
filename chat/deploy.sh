#!/bin/bash

docker container rm -f $(docker container ls --all)
docker rmi -f $(docker images --all)

docker-compose up
