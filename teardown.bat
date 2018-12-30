REM ##
REM # Script to remove/undepoy all project resources from the local Minikube environment.
REM ##

REM # Delete mongod stateful set + mongodb service + secrets + host vm configuer daemonset
kubectl delete statefulsets mongod
kubectl delete services mongodb-service
kubectl delete secret shared-bootstrap-data
sleep 3

REM # Delete persistent volume claims
kubectl delete persistentvolumeclaims -l role=mongo