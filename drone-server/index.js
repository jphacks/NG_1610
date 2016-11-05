var express = require("express");
var app = express();

var sumo = require("node-jumping-night");
var drone = sumo.createClient();

// websocket to web-server
var WebSocketClient = require('websocket').client;
var client = new WebSocketClient();
var connection_with_web_server;

client.on('connectFailed', function(error) {
  console.log('Connect Error: ' + error.toString());
});

client.on('connect', function(connection) {
  console.log('WebSocket Client Connected');
  connection_with_web_server = connection;
  connection.on('error', function(error) {
      console.log("Connection Error: " + error.toString());
  });
  connection.on('close', function() {
      console.log('echo-protocol Connection Closed');
  });
  connection.on('message', function(message) {
      if (message.type === 'utf8') {
          console.log("Received: '" + message.utf8Data + "'");
          switch (message.utf8Data) {
            case "f": // forward
              drone.forward(20);
              break;
            case "b": // back
              drone.backward(20);
              break;
            case "r": // right turn
              drone.right(20);
              break;
            case "l": // left turn
              drone.left(20);
              break;
            case "s": // stop
              drone.stop();
              break;
            case "j": // jump
              drone.postureJumper();
              drone.animationsHighJump();
              break;
            default:
          }
      }
  });
});


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

  drone.connect(function() {
    var video = drone.getVideoStream();
    video.on("data", function(data) {
      connection_with_web_server.sendBytes(data);
    });
  });
  res.send("Roger!")
});
