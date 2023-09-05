# The server root repository for [Asyncawait](asyncawait.xyz)

## Todo:
- make responsive for mobile devices

``` sh

rsync -rtvzP ./asyncawait/ root@asyncawait.xyz:/var/www/asyncawait --exclude 'node_modules'

```