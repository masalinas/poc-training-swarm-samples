# Description
Using configs and secrets  in your apps

## Steps

- **STEP-01**: create some configs and secrets in docker swarm
```
$ echo '{"logLevel": "debug"}' | docker config create app_config 
```

```
$ echo "mydbuser" | docker secret create db_user -
$ echo "supersecret" | docker secret create db_pass -
```

- **STEP-02**: create some configs and secrets in docker swarm