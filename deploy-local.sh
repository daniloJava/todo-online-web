#!/usr/bin/env bash

DOCKER_TAG=todo_online-webtestee:todo_online-webtestee

# Constrói a imagem Docker do projeto a partir do Dockerfile.
docker build --tag ${DOCKER_TAG} .

# Submete a imagem Docker gerada para o repositório Registry.
# docker push ${DOCKER_TAG}

# Executa o deploy da imagem Docker no Cluster Swarm com o namespace "SSP".
docker stack deploy --compose-file todo_online_docker-compose.local.yml --with-registry-auth SSP
