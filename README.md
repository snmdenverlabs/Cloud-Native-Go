# Cloud-Native-Go
Guru Charcha App

Steps to deploy App:
Open Terminal or Command Prompt having GIT & Docker installed
$ git clone https://github.com/snmdenverlabs/Cloud-Native-Go.git
$ docker-compose up -d
$ docker ps -a 
We should now see two running containers one having nginx:1.11.9 and another cloud-native-go:1.0.1-alpine

Steps to Clean Up App:
$ docker-compose kill
$ docker-compose rm

Docker/Docker-Compose commands commonly used:
$ docker-compose up -d --build
$ docker ps -a
$ docker images

Docker Clean Up scripts to start fresh: (Optional steps below, kindly note these commands which will remove all the images & other docker ecosystem objects from local docker deamon)
$ docker system prune
$ docker rmi $(docker images -q)
