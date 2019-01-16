#!/bin/sh
set -eu

cd /home/app/app
echo -e "*** \e[104m\e[30m\e[1mNODE_ENV: $NODE_ENV\e[0m ***"

do_stop() {
	cd /home/app/app
	su-exec app yarn pm2 delete server
}

do_show_status() {
	git --no-pager log --abbrev-commit -n 1 --oneline --no-decorate
	git --no-pager status
}

case "${1:-}" in

	"root" )
		shift
		cd /root
		exec ash $@
		;;
	
	"app" )
		shift
		cd /home/app/app
		do_show_status
		exec su-exec app ash $@
		;;

	"start" )
		shift
		cd /home/app/app
		do_show_status
		su-exec app yarn build
		su-exec app yarn pm2 start dist/prod/server.js --name server
		trap do_stop 1 2 3 15
		while true; do sleep 60; done
		;;

	"yarn" )
		shift
		cd /home/app/app
		do_show_status
		su-exec app yarn $@
		;;

	* )
		echo "USAGE: [ root | app | yarn | start | stop ]"
		exit 1
		;;

esac
