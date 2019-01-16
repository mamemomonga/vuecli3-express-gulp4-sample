# Vue-cli3 + Express + Gulp4 サンプルコード

# ローカル

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

## モジュール導入

	$ yarn install
	$ yarn --cwd 'client' install

## 開発

developmentモードの設定(デフォルト)

	$ export NODE_ENV=development

productionモードの設定

	$ export NODE_ENV=production

ビルド

	$ yarn build


デバッグサーバ

	$ yarn gulp

## productionサーバ起動

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

# Docker環境

* dockerおよびdocker-composeが必要。
* 開発はローカル環境で行うことをおすすめします。
* 最初にproduction環境を構築したイメージが生成されます。
* development.sh では プロジェクトのディレクトリが /home/app/app にマウントされます。

## 準備

	$ docker-compose build

## production環境

	$ docker-compose up -d

## development環境

	$ ./development.sh app

Linuxの場合ローカルフォルダのユーザ:グループが10000:10000になります。
commitする場合など修正してください。

	$ sudo chown -R $(id -u):$(id -g) .

で修正できます。

