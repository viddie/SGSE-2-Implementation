# Docker Image zu Kubernetes

Von nichts zum funktionierenden Service sind diese Schritte notwendig:

1. NodeJS App + Dockerfile auf euren Branch in unser GitHub Repo pushen
2. Die Schritte unten befolgen, um den Service einmalig in Kubernetes zu starten

Jetzt sollte der Service abrufbar sein. Falls nicht, checkt die Logs (Befehle stehen weiter unten). Wenn ihr wieder etwas pusht wird automatisch ein neues Image zu Docker Hub hochgeladen. Danach brauch es nur noch ein `kubectl rollout restart deployment <name>` und der Service ist auf dem neuesten Stand.

## Deployment & Service yaml

In dem Ordner "templates" liegt eine Datei "service-deployment-template.yaml". Jeder Microservice muss diese Datei einmal kopieren, den Namen und das Docker Image ändern (von "`<name>`" zu den Namen, die unten in der Tabelle stehen) und in das Kubernetes Cluster laden. Dafür sind die untenstehenden Befehle:

| Befehl                                              | Erklärung                                                    |
| --------------------------------------------------- | ------------------------------------------------------------ |
| `kubectl apply -f <name-der-deployment-datei>.yaml` | Registriert oder Aktualisiert eine Deployment/Service Definition in Kubernetes |

Für die Benennung eurer Services steht unten eine Tabelle. Die Namen müssen eingehalten werden, da der `ingress.yaml` Eintrag für diese Services schon erstellt wurde. Der "targetPort" des Services muss der Port sein, auf dem der Express Server listened.

Wenn euer Service gestartet ist, kann auf den Microservice über die URL `http://sgse2.ad.fh-bielefeld.de/api/<microservice>` zugegriffen werden, auch von extern. So könnt ihr überprüfen, ob der Service gestartet ist:

- `kubectl get service` - In der Auflistung muss euer Service als `ClusterIP` aufgelistet sein, mit dem Port aus dem Feld `port` der deploment.yaml (Also 3000)
- `kubectl get pods` - In dieser Auflistung muss ein Pod von eurem Service angezeigt werden. Der Name ist der Name des Deployments (`<microservice>-deployment`) mit einem zufälligen Hash dahinter, der Pod muss `READY 1/1` mit dem Zustand `STATUS Running` sein.



Bennenung für Kubernetes Deployment/Service in der deployment.yaml:

| Microservice       | Microservice Name |
| ------------------ | ----------------- |
| E-Mail             | email             |
| Suche              | search            |
| Chat               | chat              |
| Angebote           | offers            |
| Bewertungen        | ratings           |
| Benutzerverwaltung | user              |
| Frontend           | frontend          |
| Test Service       | express-test      |

Diese Infos müsst ihr in eurer deployment.yaml angeben. Euer Deployment heißt dann `<name>-deployment`, der Service `<name>-service` und euer API Endpunkt ist erreichbar unter `/api/<name>`. Der Frontend Service ist unter `http://sgse2.ad.fh-bielefeld.de/` erreichbar.

## Datenbanken

| Microservice       | Datenbank | IP:Port           |
| ------------------ | --------- | ----------------- |
| E-Mail             | MySQL     | 172.17.0.7:3306   |
| Suche              | MySQL     | 172.17.0.11:3306  |
| Chat               | MongoDB   | 172.17.0.6:27017  |
| Angebote           | MongoDB   | 172.17.0.10:27017 |
| Bewertungen        | MongoDB   | 172.17.0.8:27017  |
| Benutzerverwaltung | MongoDB   | 172.17.0.12:27017 |
| Test Datenbank     | MySQL     | 172.17.0.9:3306   |

Die IP Adressen sollten sich nicht mehr ändern, also können diese hardcoded werden. Anmeldedaten (für alle gleich):

- Benutzername: `root`
- Passwort: `passwort123!`

## Nützliche Befehle für Kubernetes & Umgebung:

| Befehl                                                       | Erklärung                                                    |
| ------------------------------------------------------------ | ------------------------------------------------------------ |
| `kubectl rollout restart deployment <name>`                  | Starte Deployments neu. Nützlich, wenn ihr ein neues Docker Image gepusht habt und den Service nicht aktualisiert |
| `kubectl exec -it <pod> -- /bin/bash`                        | Öffnet eine bash in dem Pod. Der Podname muss aus `kubectl get pods` entnommen werden |
| `curl -L sgse2.ad.fh-bielefeld.de/api/<path>`                | Eine schnelle Möglichkeit zum Abrufen eures Microservices wenn ihr auf dem Server seid. |
| `sudo kubectl port-forward service/ingress-nginx-controller -n ingress-nginx --address 0.0.0.0 80:80` | Macht den Cluster Endpunkt für externe auf (Läuft derzeitig schon auf dem Server) |
| `kubectl get service`                                        | Zum Abfragen, ob der Service hinzugefügt wurde               |
| `kubectl get pods`                                           | Zum Abfragen, ob das Docker Image für den Service in einem Pod ausgeführt werden konnte |
| `kubectl logs <pod-name>`                                    | `<pod-name>` muss aus `kubectl get pods` kopiert werden. Gibt die logs aus, die z.B. über ein `console.log` im Express.js Server geloggt wurden |


