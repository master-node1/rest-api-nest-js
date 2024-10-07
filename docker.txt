Docker commands:

create a docker image

docker build -t [image name] [path to Dockerfile]

Docker run

docker run --name competent_easley --network moniter-services_monitoring --network open-services_microservice-network -p 9000:9000 ocmp-api-gateway

create a version tag for image

docker tag [image name] [usename]/[imagename]:[verstion]

docker push [usename]/[imagename]:[verstion] 

TO run a compose file
docker-compose up -d


Kubectl commands:

To apply a manifest file
kubectl -n [namespace] apply -f [manifestfile location]

To delete complete services
kubectl -n [namespace] delete -f [manifestfile location]


To get all pods in a name space 

kubectl -n [namespace] get pods


To get all pods/service/deployments in a name space 

kubectl -n [namespace] get all

To rollout and restart specific pod in kubectl

kubectl -n [namespace] rollout restart deployment [deployement name]


To get logs in specific pod

kubectl -n [namespace] logs -f [pods name]


To describe a specific pod

kubectl -n [namespace] describe [pod name]


To enter into command line of specific pod
kubectl -n [namespace] exec -it [pods name] bash -- sh





