docker buildx build --no-cache --platform linux/amd64 -t website:latest --build-arg ENV=staging .
docker run -it --publish 8010:80 website 
