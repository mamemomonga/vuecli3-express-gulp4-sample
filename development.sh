#!/bin/bash
set -eu
source .env

DCR_IMAGE=$COMPOSE_PROJECT_NAME
DCR_CONTAINER=$DCR_IMAGE'-dev'
DCR_VOLUME=$DCR_IMAGE

case "${1:-}" in
	"bindfs-install" )
		set -e
		docker plugin install lebokus/bindfs
		exit
		;;
	"bindfs-uninstall" )
		set -e
		docker plugin disable lebokus/bindfs || true
		docker plugin rm lebokus/bindfs
		exit
		;;
	"bindfs-create" )
		set -e
		docker volume create -d lebokus/bindfs -o sourcePath=$(pwd) -o map=$(id -u)/10000:@$(id -g)/@10000 $DCR_VOLUME
		exit
		;;
	"bindfs-remove" )
		set -e
		docker volume rm $DCR_VOLUME
		exit
		;;
	* )
	exec docker run --rm -it \
		-p 8888:8888 \
		-e NODE_ENV=development \
		-v $DCR_VOLUME:/home/app/app \
		$DCR_IMAGE $@
	;;
esac

