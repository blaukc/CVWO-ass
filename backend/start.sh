docker rm $(docker stop $(docker ps -a -q --filter ancestor=cvwo-backend))

docker-compose up -d --build

sleep 5
