# Docker on UGREEN

> Example `docker-compose.yml` for running a simple web service on a UGREEN NAS.

UGREEN's Docker UI accepts standard Compose YAML. A common pattern is to keep the project under a shared folder and use bind mounts for persistence.

## Example

```yaml
services:
  nginx:
    image: nginx:alpine
    container_name: nyx-kit-nginx
    restart: unless-stopped
    ports:
      - "8080:80"
    volumes:
      - /volume1/docker/nyx-kit/html:/usr/share/nginx/html:ro
```

## Notes

- Replace `/volume1/docker/nyx-kit/html` with the shared-folder path on your NAS.
- If you need persistence for another app, add a second bind mount under `volumes:`.
- If you want this repo to serve a built site instead of static files, swap `nginx:alpine` for the image you actually deploy.
