var express = require("express");
var app = express();

// websocket to web-server
var WebSocketClient = require('websocket').client;
var client = new WebSocketClient();

client.on('connectFailed', function(error) {
    console.log('Connect Error: ' + error.toString());
});

client.on('connect', function(connection) {
    console.log('WebSocket Client Connected');
    connection.on('error', function(error) {
        console.log("Connection Error: " + error.toString());
    });
    connection.on('close', function() {
        console.log('echo-protocol Connection Closed');
    });
    connection.on('message', function(message) {
        if (message.type === 'utf8') {
            console.log("Received: '" + message.utf8Data + "'");
        }
    });

    function sendNumber() {
        if (connection.connected) {
            var number = Math.round(Math.random() * 0xFFFFFF);
            connection.sendUTF(number.toString());
            setTimeout(sendNumber, 1000);
        }
    }
    sendNumber();
});


var sumo = require("node-jumping-night");
var drone = sumo.createClient();

var server = app.listen(3000, function(){
    console.log("Node.js is listening to PORT:" + server.address().port);
});

app.get("/", function(req, res, next){
    res.send("Hello! I'm drone server.");
});

app.get("/emergency", function(req, res, next){
  console.log("Emergency!");
  // TODO URLは変える必要あり
  client.connect('ws://localhost:5000/ws/drone', null);

  // drone.connect(function() {
  //   res.send("Connected")
  // });
  res.send("ok")
});
