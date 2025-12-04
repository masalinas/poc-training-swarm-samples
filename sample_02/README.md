# Deploy a portal service stack
In this case we build a image and published our custom portal service stack to be deployed and scale.

## Build, push ans test your service
From host build, push and test your service
$ docker build -t my-web-replica .
$ docker tag my-web-replica ofertoio/my-web-replica
$ docker push ofertoio/my-web-replica
$ docker run --rm -p 8095:80 my-web-replica 

## Upload the service satck to cluster
Upload service stack to manager node
$ docker exec -it swarm-manager mkdir /sample_02
$ docker cp docker-compose.yaml swarm-manager:/sample_02

## Execute service stack
From manager node deploye the service stack
$ docker exec -it swarm-manager docker stack deploy -d -c /sample_02/docker-compose.yaml my-web-replica
Creating network mmy-web-replica_default
Creating service my-web-replica_nginx

## Check service stack
From manager node check the service stack

$ docker exec -it swarm-manager docker stack ls
NAME      SERVICES
my-web-replica   1

$ docker exec -it swarm-manager docker stack services my-web-replica
ID             NAME           MODE         REPLICAS   IMAGE          PORTS
p61wzqkkbrlx   my-web-replica_nginx   replicated   1/1        nginx:latest   *:8095->80/tcp

$ docker exec -it swarm-manager docker service ps my-web-replica_nginx
ID             NAME                     IMAGE                            NODE           DESIRED STATE   CURRENT STATE           ERROR     PORTS
z6zlxjq92s4g   my-web-replica_nginx.1   ofertoio/my-web-replica:latest   e5a5ef6cc0ad   Running         Running 7 minutes ago             
h2br4xpr0eoj   my-web-replica_nginx.2   ofertoio/my-web-replica:latest   e5866becc3cf   Running         Running 6 minutes ago 

## Check tasks and resources
We can get inspect each task from manager node
docker exec -it swarm-manager docker inspect z6zlxjq92s4g
docker exec -it swarm-manager docker inspect h2br4xpr0eoj

We can get the index value from each node
docker exec -it swarm-worker1 docker exec -it 3a9edb9dbeae cat /usr/share/nginx/html/index.html
docker exec -it swarm-worker2 docker exec -it 3a9edb9dbeae cat /usr/share/nginx/html/index.html

## Load the portal
Open your browser and load the portal from any node of the cluster

http://192.168.49.2:8095/

## Scale service stack
From manager node scale service stack

$ docker exec -it swarm-manager docker service scale my-web-replica_nginx=2
my-web_nginx scaled to 2
overall progress: 2 out of 2 tasks 
1/2: running   [==================================================>] 
2/2: running   [==================================================>] 
verify: Service my-web-replica_nginx converged 

## Remove the service stack
From manager node remove service stack

$ docker exec -it swarm-manager docker stack rm my-web-replica