# # Description
Deploy a portal service stack in the cluster and scales later

## Upload service stack
```
$ docker exec -it swarm-manager mkdir /sample_01
$ docker cp docker-compose.yaml swarm-manager:/sample_01
$ docker cp html swarm-manager:/sample_01
```

## Execute service stack
```
$ docker exec -it swarm-manager docker stack deploy -d -c /sample_01/docker-compose.yaml my-web
Creating network my-web_default
Creating service my-web_nginx
```

## Check service stack

```
$ docker exec -it swarm-manager docker stack ls
NAME      SERVICES
my-web    1

$ docker exec -it swarm-manager docker stack services my-web
ID             NAME           MODE         REPLICAS   IMAGE          PORTS
p61wzqkkbrlx   my-web_nginx   replicated   1/1        nginx:latest   *:8099->80/tcp
```

## Load the portal
Open your browser and load the portal from any node of the cluster
```
http://192.168.49.2:8099/
```

## Scale service stack
From manager node scale service stack

```
$ docker service scale my-web_nginx=2
my-web_nginx scaled to 2
overall progress: 2 out of 2 tasks 
1/2: running   [==================================================>] 
2/2: running   [==================================================>] 
verify: Service my-web_nginx converged 
```

## Remove the service stack
```
$ docker exec -it swarm-manager docker stack rm my-web
```