# Senior Project
Senior project for my bachelors degree at the University of Florida

# Project
This will be a playlist manager.

## Instructions for deploying server
To build for a Raspberry Pi using an ARMv7 processor
```
env GOOS=linux GOARCH=arm go build
```

Stop the service
```
sudo service seniorproject-server stop
```
Transfer server executable and allow it to be executed
```
sudo chmod +x ./server
```
Restart the service
```
sudo service seniorproject-server start
```
To check the status
```
sudo systemctl status seniorproject-server.service
```
To edit the service
```
sudo nano /etc/systemd/system/seniorproject-server.service
sudo systemctl daemon-reload
```


## Instructions for deploying client server
Create the production build
```
npm run build:production
```
Stop the service
```
sudo service seniorproject-client stop
```
Transfer the build directory
Restart the service
```
sudo service seniorproject-client start
```
To check the status
```
sudo systemctl status seniorproject-client.service
```
To edit the service
```
sudo nano /etc/systemd/system/seniorproject-client.service
sudo systemctl daemon-reload
```