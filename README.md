# Vue-cli3 + Express + Gulp4 サンプルコード

## node.js セットアップ

anyenvの導入

	$ git clone https://github.com/riywo/anyenv ~/.anyenv
	$ echo 'export PATH="$HOME/.anyenv/bin:$PATH"' >> ~/.zshrc
	$ echo 'eval "$(anyenv init -)"' >> ~/.zshrc
	$ exec $SHELL -l
	$ anyenv install ndenv

node.jsの導入

	$ ndenv install -l
	$ ndenv install v11.4.0
	$ ndenv global v11.4.0
	$ node -v
	$ npm -v

yarnの導入

	$ curl -o- -L https://yarnpkg.com/install.sh | bash

## 準備

	$ yarn install
	$ yarn --cwd 'client' install


## 利用方法

developmentモードの設定(デフォルト)

	$ export NODE_ENV=development

productionモードの設定

	$ export NODE_ENV=production

ビルド

	$ yarn build


デバッグサーバ

	$ yarn watch

# productionサーバ起動

ビルドと起動

	$ NODE_ENV=production yarn build
	$ yarn start

状態確認

	$ yarn pm2 show server

停止

	$ yarn pm2 stop server

削除

	$ yarn pm2 delete server
	
モニタリング

	$ yarn pm2 monit


