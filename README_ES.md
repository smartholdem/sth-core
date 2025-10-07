[RU](./README_RU.md) [EN](./README.md) [ZH](./README_ZH.md) [ES](./README_ES.md) [DE](./README_DE.md) [ID](./README_ID.md) [VN](./README_VN.md) [FR](./README_FR.md)

# Blockchain Core de SmartHoldem

![Blockchain de SmartHoldem](https://raw.githubusercontent.com/smartholdem/sth-core/main/packages/core/banner.png)


## Requisitos

- SO Ubuntu v20 - v24
- nodejs v16 - v18


## Instalación

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
## Descargar e instalar el núcleo
```shell
git clone https://github.com/smartholdem/sth-core.git
cd sth-core
yarn setup
```

## MainNet

## Sincronización de la blockchain desde una instantánea
Cómo obtener una instantánea de https://snapshots.smartholdem.io/

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
--blocks # bloques para agregar, se correlaciona con el nombre de la carpeta

### Nodo completo de retransmisión (Relay Full Node)
```shell
cd sth-core/packages/core
yarn sth config:publish --network=mainnet --reset
yarn sth relay:start --network=mainnet
pm2 save
pm2 startup
pm2 log
```

### Nodo de forja de delegados (Delegate Forging Node)
```shell
cd sth-core/packages/core
nano bin/config/mainnet/delegates.json e inserte "frase de contraseña de 12 palabras"
yarn sth config:publish --network=mainnet --reset
yarn sth core:start --network=mainnet
pm2 save
pm2 startup #(después de 'Para configurar el script de inicio, copie/pegue el siguiente comando:...')
pm2 log
```
o pm2 list
o pm2 restart
o pm2 stop all
o pm2 save

## Testnet

```shell
cd sth-core/packages/core
yarn sth config:publish --network=testnet --reset
yarn full:testnet
```

## Actualización
```shell
cd sth-core
git pull
yarn setup
pm2 restart 0
pm2 log
```
## Instantáneas (Snapshots)

Crear un volcado de la base de datos
```shell
cd sth-core/packages/core
yarn sth snapshot:dump
```
almacenado en la carpeta:
```shell
la
cd .local/share/sth-core/mainnet/snapshots
```