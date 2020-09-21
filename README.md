# My website


This is my website, which will shortly be accessible here: [baptiste-zorzi.com](https://baptiste-zorzi.com)


## Start

To start the container, the easiest solution is to use the Docker container.

You can launch it with the following command:
```bash
sudo docker run \
	-d \
	--name zorzi \
	--restart unless-stopped \
	-v /etc/letsencrypt/live/baptiste-zorzi.com/:/usr/src/app/.ssl:ro \
	--mount type=bind,source=/etc/letsencrypt/live/baptiste-zorzi.com/,target=/usr/src/app/.ssl,readonly \
	-p 80:80 \
	-p 443:443 \
	z0rzi/baptiste-zorzi.com:latest
```
