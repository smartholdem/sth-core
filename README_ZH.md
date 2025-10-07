[RU](./README_RU.md) [EN](./README.md) [ZH](./README_ZH.md) [ES](./README_ES.md) [DE](./README_DE.md) [ID](./README_ID.md) [VN](./README_VN.md) [FR](./README_FR.md)

# SmartHoldem 核心区块链

![SmartHoldem 区块链](https://raw.githubusercontent.com/smartholdem/sth-core/main/packages/core/banner.png)


## 要求

- 操作系统 Ubuntu v20 - v24
- nodejs v16 - v18


## 安装

```shell
sudo adduser sth
sudo usermod -aG sudo sth
sudo su - sth
```
```shell
sudo apt-get update --fix-missing
sudo apt update
sudo apt upgrade -y
sudo apt-get install -y git curl apt-transport-https update-notifier
sudo apt-get install build-essential libcairo2-dev pkg-config libtool autoconf automake libpq-dev jq -y
sudo apt-get -y install libjemalloc-dev
curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.40.3/install.sh 2>/dev/null | bash
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh"
nvm install 18.20.8
npm install -g yarn pm2 forever grunt-cli

sudo apt install python-is-python3
```
```shell
sudo apt-get install postgresql postgresql-contrib -y
sudo -i -u postgres psql -c "CREATE USER sth WITH PASSWORD 'password' CREATEDB;"
sudo -i -u postgres psql -c "CREATE DATABASE sth_mainnet WITH OWNER sth;"
```
## 下载并安装核心
```shell
git clone https://github.com/smartholdem/sth-core.git
cd sth-core
yarn setup
```

## 主网

## 从快照同步区块链
如何从 https://snapshots.smartholdem.io/ 获取快照

```shell
mkdir -p /home/sth/.local/share/sth-core/mainnet/snapshots
cd /home/sth/.local/share/sth-core/mainnet/snapshots
wget https://snapshots.smartholdem.io/1-8133951.tgz
tar -zxvf 1-8133951.tgz
rm 1-8133951.tgz

cd /home/sth/sth-core/packages/core
yarn sth config:publish --network=mainnet --reset
dropdb sth_mainnet
sudo -i -u postgres psql -c "CREATE DATABASE sth_mainnet WITH OWNER sth;"
yarn sth snapshot:restore --blocks 1-8133951
yarn sth relay:start --network=mainnet
pm2 log
```
--blocks # 要附加的块，与文件夹名称相关

### 中继全节点
```shell
cd sth-core/packages/core
yarn sth config:publish --network=mainnet --reset
yarn sth relay:start --network=mainnet
pm2 save
pm2 startup
pm2 log
```

### 委托锻造节点
```shell
cd sth-core/packages/core
nano bin/config/mainnet/delegates.json 并插入 "12个单词的密码"
yarn sth config:publish --network=mainnet --reset
yarn sth core:start --network=mainnet
pm2 save
pm2 startup #(在'To setup the Startup Script, copy/paste the following command:...'之后)
pm2 log
```
或 pm2 list
或 pm2 restart
或 pm2 stop all
或 pm2 save

## 测试网

```shell
cd sth-core/packages/core
yarn sth config:publish --network=testnet --reset
yarn full:testnet
```

## 升级
```shell
cd sth-core
git pull
yarn setup
pm2 restart 0
pm2 log
```
## 快照

创建数据库转储
```shell
cd sth-core/packages/core
yarn sth snapshot:dump
```
存储在文件夹中：
```shell
la
cd .local/share/sth-core/mainnet/snapshots
```