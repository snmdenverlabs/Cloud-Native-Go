FROM golang:1.14-alpine as builder

WORKDIR /app/
COPY microservice.go /app/
COPY api /app/api

RUN CGO_ENABLED=0 go build -o /bin/Cloud-Native-Go

FROM alpine:3.5

WORKDIR /app/
COPY --from=builder /bin/Cloud-Native-Go /app/

RUN chmod +x /app/Cloud-Native-Go

ENV PORT 7070
EXPOSE 7070

ENTRYPOINT ["/app/Cloud-Native-Go"]
