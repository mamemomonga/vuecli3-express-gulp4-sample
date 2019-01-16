#!/bin/sh
set -eu

do_stop() {
	cd /home/app/app
	su-exec app yarn pm2 delete server
}

echo -e "*** \e[104m\e[30m\e[1mNODE_ENV: $NODE_ENV\e[0m ***"

case "${1:-}" in

	"root" )
		shift
		exec ash $@
		;;
	
	"app" )
		shift
		exec su-exec app ash $@
		;;

	"start" )
		shift
		cd /home/app/app
		su-exec app yarn build
		su-exec app yarn pm2 start dist/prod/server.js --name server
		trap do_stop 1 2 3 15
		while true; do sleep 60; done
		;;

	"yarn" )
		shift
		cd /home/app/app
		su-exec app yarn $@
		;;

	* )
		echo "USAGE: [ root | app | yarn | start | stop ]"
		exit 1
		;;

esac
