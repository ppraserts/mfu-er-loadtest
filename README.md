# MFU ER Load Test
This repo provide step for load test by use K6.

## Installation
- Go to https://docs.docker.com/get-started/
- Choose your preferred operating system
- Install until finish then try open command and test version by:
```sh
docker --version
## Docker version 20.10.5, build 55c4c88
```
and
```sh
docker-compose --version
## docker-compose version 1.28.5, build c4eb3a1f
```

## Step with out report
- Start load test by configuration number virtual users on script "k6-scripts/script.js"
```sh
export let options = {
    stages: [
        // Ramp-up from 1 to 5 virtual users (VUs) in 5s
        { duration: "10s", target: 75 },
    
        // Stay at rest on 5 VUs for 10s
        { duration: "40s", target: 75 },
    
        // Ramp-down from 5 to 0 VUs for 5s
        { duration: "10s", target: 0 },
      ],
}
```
- Start your load test
```sh
k6 run .\k6-scripts\script.js
```
- Analyze result and server report then try to turnning your application and server then try to re-test again.

<br/><br/>

## Step with report
- Start load grafana and influxdb by
```sh
docker-compose up -d
```
and
```sh
docker-compose ps
## grafana_1    /run.sh                  Up       0.0.0.0:3000->3000/tcp
## influxdb_1   /entrypoint.sh influxd   Up       0.0.0.0:8086->8086/tcp
## k6_1         k6
```
- Go to http://localhost:3000/d/k6/k6-load-testing-results?orgId=1&refresh=5s
- Start load test by configuration number virtual users on script "k6-scripts/script.js"
```sh
export let options = {
    stages: [
        // Ramp-up from 1 to 5 virtual users (VUs) in 5s
        { duration: "10s", target: 75 },
    
        // Stay at rest on 5 VUs for 10s
        { duration: "40s", target: 75 },
    
        // Ramp-down from 5 to 0 VUs for 5s
        { duration: "10s", target: 0 },
      ],
}
```
- Start your load test
```sh
docker-compose run k6 run /scripts/script.js
```
- Go to http://localhost:3000/d/k6/k6-load-testing-results?orgId=1&refresh=5s to see result
- Analyze result and server report then try to turnning your application and server then try to re-test again.