#!/bin/sh
rsync -rtvzP ./ root@asyncawait.xyz:/var/www/asyncawait --exclude='node_modules' --exclude=".git"