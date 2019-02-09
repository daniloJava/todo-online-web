#==================================== MULTISTAGE -> base ====================================
# FROM [name of images]:[Version/tag the image]
# Referência: https://docs.docker.com/engine/reference/builder/#from
#============================================================================================
FROM node:carbon-slim AS base
WORKDIR /app

#================================ MULTISTAGE -> dependence ================================
# FROM [name of images]: [Version/tag the image]
# Reference: https://docs.docker.com/engine/reference/builder/#from
# 
# Uses the image defined in STAGE "base" to lower the dependencies used in the project.
#============================================================================================
FROM base AS dependence
ARG PROXY_URL
COPY [ "./", "./" ]

ENV \
    http_proxy=${PROXY_URL} \
    https_proxy=${PROXY_URL}

RUN \
    if [ "$PROXY_URL" != "" ]; then \
    npm config set http-proxy ${PROXY_URL}; \
    npm config set https-proxy ${PROXY_URL}; \
    npm config set registry=http://registry.npmjs.org/ \
    npm config set strict_ssl false \
    npm config list; \
    npm rebuild node-sass; \
    npm run build --silent; \
    npm install --log-level warn; \
    else \
    npm rebuild node-sass; \
    npm run build --silent; \
    npm install --log-level warn; \
    fi



ENV \
    http_proxy=  \
    https_proxy=

#================================== MULTISTAGE -> release ===================================
# FROM [name of images]:[Version/tag the image]
# Reference: https://docs.docker.com/engine/reference/builder/#from
# 
# Defines a local or public image of the Docker Store. Here is an official image of the
# Nginx (based on linux Debian Stretch Slim distribution). In its first execution, it
# will be downloaded to the computer and used in the build to create the application images.
#============================================================================================
FROM nginx:stable AS release

#============================================================================================
# LABEL maintainer=[name and email of image maintainer]
# Reference: https://docs.docker.com/engine/reference/builder/#label
#
# Indicates the responsible/author for maintaining the image.
#============================================================================================
LABEL maintainer="Danilo Manoel Oliveira da Silva <danilo.manoel_oliveira@hotmail.com>"

#============================================================================================
# ARG <nome do argumento>[=<valor padrão>]
# Reference: https://docs.docker.com/engine/reference/builder/#arg
#
# The ARG statement defines a variable that users can pass at compile time
# for the constructor with the docker build command.
#============================================================================================
ARG PORT

#============================================================================================
# ENV [name of the environment variable]
# Reference: https://docs.docker.com/engine/reference/builder/#env
# 
# Environment variables with the application path inside the container.
#============================================================================================
ENV \
    PORT=${PORT:-80} \
    NODE_ENV=production

#============================================================================================
# VOLUME [volume name]
# Reference: https://docs.docker.com/engine/reference/builder/#volume
# 
# Creates a mount point with the specified name and marks it as a persistent volume 
# mounted from native hosts or other containers.
#============================================================================================
VOLUME /tmp

#============================================================================================
# EXPOSE [port number]
# Reference: https://docs.docker.com/engine/reference/builder/#expose
#
# It will expose the port to the host (host) machine. You can expose multiple ports, such as
# for example: EXPOSE 80 443 8080
#============================================================================================
EXPOSE 80

#============================================================================================
# COPY [file to be copied] [destination of copied file]
# Reference: https://docs.docker.com/engine/reference/builder/#copy
#
# Copy the Nginx and SPA application configuration files into the container.
#============================================================================================
COPY config/nginx/nginx.conf /etc/nginx/nginx.conf
COPY config/nginx/default.conf /etc/nginx/conf.d/default.conf
COPY --from=1 /app/dist /usr/share/nginx/html
