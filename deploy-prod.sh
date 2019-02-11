#!/usr/bin/env bash

# Constructs the Docker image of the project from Dockerfile.
docker pull danilojava/todo-online:todo-online-web

# Performs the deploy of the Docker image in the Swarm Cluster with the "APP" namespace.
docker stack deploy --compose-file todo_online_docker-compose.local.yml --with-registry-auth APP
