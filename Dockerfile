FROM node:11.6.0-alpine

RUN set -xe && \
	apk --update add tzdata curl su-exec && \
	cp /usr/share/zoneinfo/Asia/Tokyo /etc/localtime && \
	apk del tzdata && \
	rm -rf /var/cache/apk/*

RUN set -xe && \
	curl -o- -L https://yarnpkg.com/install.sh | sh

RUN set -xe && \
	adduser -u 10000 -D app

COPY package.json yarn.lock /home/app/app/
COPY client/package.json client/yarn.lock /home/app/app/client/

RUN set -xe && \
	chown -R app:app /home/app && \
	cd /home/app/app && \
	su-exec app yarn install --pure-lockfile && \
	su-exec app yarn --cwd client install --pure-lockfile

COPY client /tmp/app/client
COPY server /tmp/app/server
COPY babel.config.js /tmp/app/babel.config.js
COPY gulpfile.babel.js /tmp/app/gulpfile.babel.js
COPY gulp_webpack_server.js /tmp/app/gulp_webpack_server.js
COPY entrypoint.sh /entrypoint.sh

RUN set -xe && \
	su-exec app sh -c 'tar cC /tmp/app . | tar xvC /home/app/app' && \
	rm -rf /tmp/app

ENTRYPOINT ["/entrypoint.sh"]

