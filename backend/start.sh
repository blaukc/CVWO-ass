echo "Stopping current container"
docker rm $(docker stop $(docker ps -a -q --filter ancestor=cvwo-backend))

sleep 5

echo "Starting docker"
docker-compose up -d --build

echo "Displaying logs:"
docker logs -f $(docker ps -a -q --filter ancestor=cvwo-backend)
