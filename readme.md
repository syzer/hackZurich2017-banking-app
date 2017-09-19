# API


## payment api
```bash
curl -d '{"payment":400,"to":123,"lat":47.3769,"long":8.5417,"date":"2017-09-16T09:26:15.020Z"}' http://1cd32fff.ngrok.io/payments -v -H 'Content-Type: application/json;charset=UTF-8' -H 'Accept: application/json, text/plain, */*'```
```

## intent api

```bash
http://robot-machine.herokuapp.com/intent?statement=am+I+poor
http://robot-machine.herokuapp.com/intent?statement=hey%20Mark%20spear
http://robot-machine.herokuapp.com/intent?statement=buy+me+some+stocks
http://robot-machine.herokuapp.com/intent?statement=i+confirm
```

Our bot First draft:

https://console.actions.google.com/?pli=1
https://github.com/livelycode/aws-lib/blob/master/examples/prod-adv.js