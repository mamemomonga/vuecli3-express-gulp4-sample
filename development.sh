#!/bin/bash
set -eu
source .env

DCR_IMAGE=$COMPOSE_PROJECT_NAME
DCR_CONTAINER=$DCR_IMAGE'-dev'

exec docker run --rm -it \
	-p 8888:8888 \
	-e NODE_ENV=development \
	-v $(pwd):/home/app/app \
	$DCR_IMAGE $@

