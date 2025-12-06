# Description
Deploy a state service stack in the cluster in globla mode (create tasks for each node in the cluster)

## Create a new cluster
Create a cluster with a shared volume in each node

```
$ docker create volume shared_volume
$ docker run -d --privileged --name swarm-manager-shared -v /mnt/shared/data:/shared --network minikube docker:dind
$ docker run -d --privileged --name swarm-worker1-shared -v /mnt/shared/data:/shared --network minikube docker:dind
$ docker run -d --privileged --name swarm-worker2-shared -v /mnt/shared/data:/shared --network minikube docker:dind

$ docker exec -it swarm-manager-shared docker swarm init --advertise-addr 192.168.49.2
Swarm initialized: current node (rfu82jwi867tvsb9ul5b93yl5) is now a manager.

To add a worker to this swarm, run the following command:

    docker swarm join --token SWMTKN-1-06zliwtq9ikf625x6phruqnuxseraskf2t70j1eukfc0vwpy1w-8n87viuc55ju5qxf1rkxu1y8m 192.168.49.2:2377

To add a manager to this swarm, run 'docker swarm join-token manager' and follow the instructions.
```

```
$ docker exec -it swarm-worker1-shared docker swarm join --token SWMTKN-1-06zliwtq9ikf625x6phruqnuxseraskf2t70j1eukfc0vwpy1w-8n87viuc55ju5qxf1rkxu1y8m 192.168.49.2
This node joined a swarm as a worker.

$ docker exec -it swarm-worker2-shared docker swarm join --token SWMTKN-1-06zliwtq9ikf625x6phruqnuxseraskf2t70j1eukfc0vwpy1w-8n87viuc55ju5qxf1rkxu1y8m 192.168.49.2
This node joined a swarm as a worker.
```

## Deploye the state service
Deploye a state service in global mode using the shared volume

```
$ docker service create --name shared-volume-test --mode global --mount type=bind,source=/shared,target=/data busybox sh -c "while true; do echo \$HOSTNAME - \$(date) >> /data/hosts.log; sleep 1; done"
```