#!/usr/bin/env bash

DOCKER_TAG=todo_online-web:1.0.0

# Constructs the Docker image of the project from Dockerfile.
docker build --tag ${DOCKER_TAG} .

# Submits the generated Docker image to the Registry repository.
# docker push ${DOCKER_TAG}

# Performs the deploy of the Docker image in the Swarm Cluster with the "APP" namespace.
docker stack deploy --compose-file todo_online_docker-compose.local.yml --with-registry-auth APP
