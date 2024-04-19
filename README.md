# SmartHoldem Core Blockchain

![SmartHoldem BlockChain](https://raw.githubusercontent.com/smartholdem/sth-core/main/packages/core/banner.png)

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
nvm install 16.13.2
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

### Delegate forging
```shell
cd packages/core
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

### Relay
```shell
cd packages/core
yarn sth config:publish --network=mainnet --reset
yarn sth relay:start --network=mainnet
pm2 save
pm2 startup
pm2 log
```

## Testnet

```shell
cd packages/core
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

Restore the database from a dump
```shell
cd sth-core/packages/core
yarn sth snapshot:restore
```

