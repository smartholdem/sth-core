# SmartHoldem Core Blockchain

![SmartHoldem BlockChain](https://raw.githubusercontent.com/smartholdem/sth-core/main/packages/core/banner.png)


## Requirements

- OS Ubuntu v20 - v24
- nodejs v16 - v18


## Installation

```shell
sudo adduser sth
sudo usermod -aG sudo sth
sudo su - sth
```
```shell
sudo apt-get update --fix-missing
sudo apt-get install -y git curl apt-transport-https update-notifier
sudo apt-get install build-essential libcairo2-dev pkg-config libtool autoconf automake libpq-dev jq -y
sudo apt-get -y install libjemalloc-dev
curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.32.0/install.sh 2>/dev/null | bash
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
## Download & install core
```shell
git clone https://github.com/smartholdem/sth-core.git
cd sth-core
yarn setup
```

## MainNet

## Blockchain sync from a snapshot
Get snapshot from https://snapshots.smartholdem.io/

```shell
mkdir -p /home/sth/.local/share/sth-core/mainnet/snapshots
cd /home/sth/.local/share/sth-core/mainnet/snapshots
wget https://snapshots.smartholdem.io/1-5917695.tgz
tar -zxvf 1-5917695.tgz
rm 1-5917695.tgz

cd /home/sth/sth-core/packages/core
yarn sth config:publish --network=mainnet --reset
dropdb sth_mainnet
sudo -i -u postgres psql -c "CREATE DATABASE sth_mainnet WITH OWNER sth;"
yarn sth snapshot:restore --blocks 1-5917695
yarn sth relay:start --network=mainnet
pm2 log
```
--blocks # blocks to append to, correlates to folder name

### Relay Full Node
```shell
cd sth-core/packages/core
yarn sth config:publish --network=mainnet --reset
yarn sth relay:start --network=mainnet
pm2 save
pm2 startup
pm2 log
```

### Delegate Forging Node
```shell
cd sth-core/packages/core
nano bin/config/mainnet/delegates.json and insert "passphrase 12 worlds"
yarn sth config:publish --network=mainnet --reset
yarn sth core:start --network=mainnet
pm2 save
pm2 startup #(after To setup the Startup Script, copy/paste the following command:...)
pm2 log
```
or pm2 list
or pm2 restart
or pm2 stop all
or pm2 save

## Testnet

```shell
cd sth-core/packages/core
yarn sth config:publish --network=testnet --reset
yarn full:testnet
```

## Upgrade
```shell
cd sth-core
git pull
yarn setup
pm2 restart 0
pm2 log
```
## Snaphots

Create a dump of the database
```shell
cd sth-core/packages/core
yarn sth snapshot:dump
```
stored in folder:
```shell
la
cd .local/share/sth-core/mainnet/snapshots
```

