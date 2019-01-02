REM ##
REM # Script to deploy a Kubernetes project with a StatefulSet running a MongoDB Replica Set, to a local Minikube environment.
REM ##

REM Create keyfile for the MongoD cluster as a Kubernetes shared secret
SET TMPFILE=mktemp
openssl rand -base64 741 > %TMPFILE%
kubectl create secret generic shared-bootstrap-data --from-file=internal-auth-mongodb-keyfile=%TMPFILE%
rm %TMPFILE%

REM # Create mongodb service with mongod stateful-set
REM # TODO: Temporarily added no-valudate due to k8s 1.8 bug: https://github.com/kubernetes/kubernetes/issues/53309
kubectl apply -f mongodb-service.yaml --validate=false
sleep 5

REM # Print current deployment state (unlikely to be finished yet)
kubectl get all 
kubectl get persistentvolumes
echo
echo "Keep running the following command until all 'mongod-n' pods are shown as running:  kubectl get all"
echo
