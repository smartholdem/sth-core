#!/usr/bin/env bash

pm2 delete sth-core > /dev/null 2>&1
pm2 delete sth-core-relay > /dev/null 2>&1
pm2 delete sth-core-forger > /dev/null 2>&1

pm2 delete core > /dev/null 2>&1
pm2 delete core-relay > /dev/null 2>&1
pm2 delete core-forger > /dev/null 2>&1

node ./scripts/upgrade/upgrade.js

# Sometimes the upgrade script doesn't properly replace STH_ with CORE_
# https://github.com/smartholdem/sth-core/blob/develop/scripts/upgrade/upgrade.js#L206
cd ~

if [ -f .config/sth-core/devnet/.env ]; then
    sed -i 's/STH_/CORE_/g' .config/sth-core/devnet/.env
fi

if [ -f .config/sth-core/devnet/plugins.js ]; then
    sed -i 's/STH_/CORE_/g' .config/sth-core/devnet/plugins.js
fi

if [ -f .config/sth-core/mainnet/.env ]; then
    sed -i 's/STH_/CORE_/g' .config/sth-core/mainnet/.env
fi

if [ -f .config/sth-core/mainnet/plugins.js ]; then
    sed -i 's/STH_/CORE_/g' .config/sth-core/mainnet/plugins.js
fi

cd ~/sth-core
yarn setup
