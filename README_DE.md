[RU](./README_RU.md) [EN](./README.md) [ZH](./README_ZH.md) [ES](./README_ES.md) [DE](./README_DE.md) [ID](./README_ID.md) [VN](./README_VN.md) [FR](./README_FR.md)

# SmartHoldem Core Blockchain

![SmartHoldem BlockChain](https://raw.githubusercontent.com/smartholdem/sth-core/main/packages/core/banner.png)


## Anforderungen

- Betriebssystem Ubuntu v20 - v24
- nodejs v16 - v18


## Installation

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
## Core herunterladen & installieren
```shell
git clone https://github.com/smartholdem/sth-core.git
cd sth-core
yarn setup
```

## MainNet

## Blockchain-Synchronisierung von einem Snapshot
So erhalten Sie einen Snapshot von https://snapshots.smartholdem.io/

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
--blocks # Blöcke zum Anhängen, korreliert mit dem Ordnernamen

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
nano bin/config/mainnet/delegates.json und "Passphrase 12 Welten" einfügen
yarn sth config:publish --network=mainnet --reset
yarn sth core:start --network=mainnet
pm2 save
pm2 startup #(nach To setup the Startup Script, copy/paste the following command:...)
pm2 log
```
oder pm2 list
oder pm2 restart
oder pm2 stop all
oder pm2 save

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

Erstellen Sie einen Dump der Datenbank
```shell
cd sth-core/packages/core
yarn sth snapshot:dump
```
gespeichert im Ordner:
```shell
la
cd .local/share/sth-core/mainnet/snapshots
```