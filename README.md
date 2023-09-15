# The server root repository for [Asyncawait](asyncawait.xyz)

## Todo:
- make responsive for mobile devices

``` sh

rsync -rtvzP ./ root@asyncawait.xyz:/var/www/asyncawait --exclude 'node_modules' --exclude .git

```