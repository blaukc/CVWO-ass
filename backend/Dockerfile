FROM golang:1.19-alpine

WORKDIR /app

COPY go.mod ./
COPY go.sum ./

COPY . ./

RUN go mod download

RUN go build -o /docker-cvwo-backend

EXPOSE 54321

CMD [ "/docker-cvwo-backend" ]