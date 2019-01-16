# Vue-cli3 + Express + Gulp4 サンプルコード

# ネイティブ環境

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

# コンテナ環境

* dockerおよびdocker-composeが必要。
* 最初にproduction環境を構築したイメージが生成されます。

## 準備(production, development共通)

	$ docker-compose build

## production環境

	$ docker-compose up -d

## development環境

* Linux, Docker for Mac対応
* bindfs volumeプラグインを使用して、ローカルのユーザとグループの食い違いを補正しています。

bindfs プラグインインストールとvolume有効化

	$ ./development.sh bindfs-install
	Plugin "lebokus/bindfs" is requesting the following privileges:
	 - mount: [/var/lib/docker/plugins/]
	 - mount: [/]
	 - device: [/dev/fuse]
	 - capabilities: [CAP_SYS_ADMIN]
	Do you grant the above permissions? [y/N] y

	$ ./development.sh bindfs-create

appユーザでログイン

	$ ./development.sh app

volume無効化とbindfs プラグインアンインストール

	$ ./development.sh bindfs-remove

	$ ./development.sh bindfs-uninstall

