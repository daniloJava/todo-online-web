#==================================== MULTISTAGE -> base ====================================
# FROM [nome da imagem]:[versão/tag da imagem]
# Referência: https://docs.docker.com/engine/reference/builder/#from
# 
# Define uma imagem local ou pública do Docker Store. Aqui é utilizado uma imagem oficial do 
# NodeJS (baseada na distribuição linux Debian Stretch Slim), cujo objetivo é servir de imagem 
# base para os demais estágios do processo de build da imagem final, reduzindo seu tamanho.
#============================================================================================
FROM node:carbon-slim AS base
WORKDIR /app

#================================ MULTISTAGE -> dependencies ================================
# FROM [nome da imagem]:[versão/tag da imagem]
# Referência: https://docs.docker.com/engine/reference/builder/#from
# 
# Utiliza a imagem definida no STAGE "base" para baixar as dependências utilizadas no projeto.
#============================================================================================
FROM base AS dependencies
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
    npm install --log-level warn; \
    else \
    npm install --log-level warn; \
    fi

ENV \
    http_proxy=  \
    https_proxy=

#==================================== MULTISTAGE -> build ===================================
# FROM [nome da imagem]:[versão/tag da imagem]
# Referência: https://docs.docker.com/engine/reference/builder/#from
# 
# Utiliza a imagem definida no STAGE "dependencies" para construir o pacote para distribuição 
# do projeto.
#============================================================================================
FROM dependencies AS build
WORKDIR /app

RUN \ 
    npm rebuild node-sass \
    npm run build --silent

#================================== MULTISTAGE -> release ===================================
# FROM [nome da imagem]:[versão/tag da imagem]
# Referência: https://docs.docker.com/engine/reference/builder/#from
# 
# Define uma imagem local ou pública do Docker Store. Aqui é utilizado uma imagem oficial do 
# Nginx (baseada na distribuição linux Debian Stretch Slim). Em sua primeira execução, ela 
# será baixada para o computador e usada no build para criar as imagens da aplicação.
#============================================================================================
FROM nginx:stable AS release

#============================================================================================
# LABEL maintainer=[nome e e-mail do mantenedor da imagem]
# Referência: https://docs.docker.com/engine/reference/builder/#label
#
# Indica o responsável/autor por manter a imagem.
#============================================================================================
LABEL maintainer="Raphael F. Jesus <rjesus@magnasistemas.com.br>"

#============================================================================================
# ARG <nome do argumento>[=<valor padrão>]
# Referência: https://docs.docker.com/engine/reference/builder/#arg
#
# A instrução ARG define uma variável que os usuários podem passar no tempo de compilação 
# para o construtor com o comando docker build.
#============================================================================================
ARG PORT

#============================================================================================
# ENV [nome da variável de ambiente]
# Referência: https://docs.docker.com/engine/reference/builder/#env
# 
# Variáveis de ambiente com o path da aplicação dentro do container.
#============================================================================================
ENV \
    PORT=${PORT:-80} \
    NODE_ENV=production

#============================================================================================
# VOLUME [nome do volume]
# Referência: https://docs.docker.com/engine/reference/builder/#volume
# 
# Cria um ponto de montagem com o nome especificado e marca-o como um volume persistente 
# montado a partir de hospedeiros nativos ou outros containers.
#============================================================================================
VOLUME /tmp

#============================================================================================
# EXPOSE [número da porta]
# Referência: https://docs.docker.com/engine/reference/builder/#expose
#
# Irá expor a porta para a máquina host (hospedeira). É possível expor múltiplas portas, como 
# por exemplo: EXPOSE 80 443 8080
#============================================================================================
EXPOSE 80

#============================================================================================
# COPY [arquivo a ser copiado] [destino do arquivo copiado]
# Referência: https://docs.docker.com/engine/reference/builder/#copy
#
# Copia os arquivos de configuração do Nginx e da aplicação SPA para dentro do container.
#============================================================================================
COPY --from=build /app/dist /usr/share/nginx/html

#============================================================================================
# ENTRYPOINT [executável seguido dos parâmetros]
# Referência: https://docs.docker.com/engine/reference/builder/#entrypoint
# 
# Inicia o container como um executável a partir da inicialização da aplicação. Essa instrução 
# é muito útil quando o container está em modo Swarm (Cluster de containers), pois caso a 
# aplicação caia, o container cai junto, indicando ao cluster aplicar a política de restart 
# configurada para a aplicação.
#============================================================================================
# TODO Verificar se há necessidade de trecho, uma vez que a imagem original já define-o.

#============================================================================================
# HEALTHCHECK --interval=[duração em segundos] --timeout=[duração em segundos]
# Referência: https://docs.docker.com/engine/reference/builder/#healthcheck
# 
# Diz ao Docker como testar um container para verificar se ele ainda está funcionando. Isso 
# pode detectar casos como um servidor web que está preso em um loop infinito e incapaz de 
# lidar com novas conexões, mesmo que o processo do servidor ainda esteja em execução.
#============================================================================================
# TODO Verificar como validar a saúde da aplicação

