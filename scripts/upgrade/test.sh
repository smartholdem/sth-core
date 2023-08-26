#!/usr/bin/env bash

rm -rf /home/sth/sth-core
git clone https://github.com/smartholdem/sth-core -b upgrade /home/sth/sth-core

mkdir /home/sth/.sth
touch /home/sth/.sth/.env

mkdir /home/sth/.sth/config

mkdir /home/sth/.sth/database
touch /home/sth/.sth/database/json-rpc.sqlite
touch /home/sth/.sth/database/transaction-pool.sqlite
touch /home/sth/.sth/database/webhooks.sqlite

mkdir /home/sth/.sth/logs
mkdir /home/sth/.sth/logs/mainnet
touch /home/sth/.sth/logs/mainnet/test.log
