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
	--mount type=bind,source="$HOME"/ssl,target=/usr/src/app/.ssl,readonly \
	-p 80:80 \
	-p 443:443 \
	z0rzi/baptiste-zorzi.com:latest
```
