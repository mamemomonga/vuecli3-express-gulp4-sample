#!/bin/bash
set -eu
source .env

DCR_IMAGE=$COMPOSE_PROJECT_NAME
DCR_CONTAINER=$DCR_IMAGE'-dev'
DCR_VOLUME=$DCR_IMAGE

case "${1:-}" in
	"bindfs-install" )
		docker plugin install lebokus/bindfs
		;;

	"bindfs-uninstall" )
		docker plugin disable lebokus/bindfs || true
		docker plugin rm lebokus/bindfs
		;;

	"bindfs-create" )
		if [ -n $( docker info --format "{{.OperatingSystem}}" | grep -q "Docker for Mac") ]; then
			# Docker for Macの場合はrootになる
			docker volume create \
				-d lebokus/bindfs \
				-o sourcePath=$(pwd) \
				-o map=0/10000:@0/@10000 \
				$DCR_VOLUME
		else
			# Linuxの場合は現在のユーザになる
			docker volume create \
				-d lebokus/bindfs \
				-o sourcePath=$(pwd) \
				-o map=$(id -u)/10000:@$(id -g)/@10000 \
				$DCR_VOLUME
		fi
		;;

	"bindfs-remove" )
		docker volume rm $DCR_VOLUME
		;;

	* )
	exec docker run --rm -it \
		-p 8888:8888 \
		-e NODE_ENV=development \
		-v $DCR_VOLUME:/home/app/app \
		$DCR_IMAGE $@
	;;
esac

