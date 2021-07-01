# Docker Image zu Kubernetes

Hier ist der Ablauf zum deployn von Docker Images zu unserem Kubernetes Cluster. Es ist derzeit noch sehr mühselig, aber so könnt ihr eure Microservices auch Kommunikation der anderen Microservices testen. CI/CD z.B. mit GitHub Actions muss ich noch nach schauen, ob wir das irgendwie bei uns hinbekommen können, oder wir ggf. auf Azure oder sowas switchen müssen.

## Vorab

Wenn ihr in irgendeiner weise Docker auf dem Server verwenden wollt, muss der folgende Befehl ausgeführt werden, damit das Terminal auf Minikube's (= unser Cluster) Docker Daemon zeigt: `eval $(minikube -p minikube docker-env)`

## Docker Image Build

Das Docker Image muss in das lokale Repository auf unserem Server. Wenn ihr noch andere Wege kennt außer den Source Code zu pushen und auf dem Server zu builden, könnt ihr mir das gerne sagen.

### Source Code pushen und auf dem Server builden

| Befehl                                              | Erklärung                                                    |
| --------------------------------------------------- | ------------------------------------------------------------ |
| `scp -r ./* <username>@sgse2.ad.fh-bielefeld.de:~/` | Kopiert alle Daten des derzeitigen Verzeichnisses auf den Server |
| `ssh <username>@sgse2.ad.fh-bielefeld.de`           | Anschließend SSH Verbindung aufbauen                         |
| `docker build -t localhost:5000/<image-name> .`     | Baut die Source Files zu einem Docker Image zusammen und lädt dieses in das lokale Repository |
| `docker image list`                                 | Zum Überprüfen, ob das Image im Repository angekommen ist    |

## Deployment, Service & Ingress yaml

In dem Ordner "templates" liegt eine Datei "service-deployment-template.yaml". Jeder Microservice muss diese Datei einmal kopieren, den Namen und das Docker Image ändern (von "`<name>`" zu wie auch immer ihr euren microservice nennen wollt) und in das Kubernetes Cluster laden. Dafür sind die untenstehenden Befehle:

| Befehl                                              | Erklärung                                                    |
| --------------------------------------------------- | ------------------------------------------------------------ |
| `kubectl apply -f <name-der-deployment-datei>.yaml` | Registriert oder Aktualisiert eine Deployment/Service Definition in Kubernetes |
| `kubectl get service`                               | Zum Abfragen, ob der Service hinzugefügt wurde               |
| `kubectl get pods`                                  | Zum Abfragen, ob das Docker Image für den Service in einem Pod ausgeführt werden konnte |
| `kubectl logs <pod-name>`                           | `<pod-name>` muss aus `kubectl get pods` kopiert werden. Gibt die logs aus, die z.B. über ein `console.log` im Express.js Server geloggt wurden |

Ihr müsst darauf achten, dass in der deployment.yaml das "port" Feld des Services und das "containerPort" Feld des Deployments übereinstimmen (in meinem Beispiel sind beide 3000). Der "targetPort" des Services muss der Port sein, auf dem der Express Server listened.

Wenn der Service mit einem Pod am Laufen ist, ist das Deployment fertig. Auf die Schnittstelle direkt zugreifen geht natürlich nicht ohne Weiteres, da diese Schnittstellen intern sind. Zum Debuggen kann allerdings dieser Befehl verwendet werden: `sudo kubectl port-forward service/<name> --address 0.0.0.0 <beliebiger-port>:3000`. Im Terminal sollte so etwas wie `Forwarding from 0.0.0.0:<port> -> <targetPort>` stehen und ihr könnt über die URL `http://sgse2.ad.fh-bielefeld.de:<port>` auf euren Microservice zugreifen.

Damit euer Microservice für die anderen Microservices sichtbar ist, muss ein Eintrag in der `ingress.yaml` gemacht werden. Da das aber nur eine einzelne Date ist, sollten wir das lieber zusammen machen, damit wir uns da nicht in die Quere kommen (am besten schon am 24.06). Wenn euer Microservice in der `ingress.yaml` hinterlegt wurde, können alle anderen Microservices über die URL `http://sgse2.ad.fh-bielefeld.de/api/<microservice>` auf diesen Zugreifen. ~~Der Hostname "api.bartersmarter.de" ist ein Eintrag in der Hosts Datei, deswegen ist dieser auch nur intern verfügbar.~~



Hier ein paar nützliche Befehle für Kubernetes & Umgebung:

| Befehl                                                       | Erklärung                                                    |
| ------------------------------------------------------------ | ------------------------------------------------------------ |
| `kubectl rollout restart deployment <name>`                  | Starte Deployments neu. Nützlich, wenn ihr ein neues Docker Image gepusht habt und den Service nicht aktualisiert |
| `kubectl exec -it <pod> -- /bin/bash`                        | Öffnet eine bash in dem Pod. Der Podname muss aus `kubectl get pods` entnommen werden |
| `curl -L api.bartersmarter.de/<path>`                        | Eine schnelle Möglichkeit zum Abrufen eures Microservices wenn ihr auf dem Server seid. |
| `sudo kubectl port-forward service/ingress-nginx-controller -n ingress-nginx --address 0.0.0.0 80:80` | Macht den Cluster Endpunkt für externe auf                   |



Datenbanken für die Microservices:

| Microservice       | Datenbank | IP:Port           |
| ------------------ | --------- | ----------------- |
| E-Mail             | MySQL     | 172.17.0.12:3306  |
| Suche              | MySQL     | 172.17.0.13:3306  |
| Chat               | MongoDB   | 172.17.0.14:27017 |
| Angebote           | MongoDB   | 172.17.0.15:27017 |
| Bewertungen        | MongoDB   | 172.17.0.16:27017 |
| Benutzerverwaltung | MongoDB   | 172.17.0.17:27017 |

Die IP Adressen sollten sich nicht mehr ändern, also können diese hardcoded werden. Anmeldedaten (für alle gleich):

- Benutzername: `root`
- Passwort: `passwort123!`