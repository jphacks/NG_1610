'use strict';

var uri = "ws://" + location.host + "/ws/client";
var ws = new WebSocket(uri);


$(function () {
  $('form').submit(function(){
    var $this = $(this);
    // ws.onopen = function() {
    //   console.log('sent message: %s', $('#m').val());
    // };
    ws.send($('#m').val());
    $('#m').val('');
    return false;
  });

  // html要素を検知
  $('#forward')
    .mousedown(function(){
      console.log("f");
      ws.send("f");
    })
  .mouseup(function(){
    console.log("s");
    ws.send("s");
  });

  $('#back')
    .mousedown(function(){
      console.log("b");
      ws.send("b");
    })
  .mouseup(function(){
    console.log("s");
    ws.send("s");
  });

  $('#left-turn')
    .mousedown(function(){
      console.log("l");
      ws.send("l");
    })
  .mouseup(function(){
    console.log("s");
    ws.send("s");
  });

  $('#right-turn')
    .mousedown(function(){
      console.log("r");
      ws.send("r");
    })
  .mouseup(function(){
    console.log("s");
    ws.send("s");
  });

  $('#stop').click(function(){
      console.log("s");
      ws.send("s");
    });
  
  ws.onopen = function(evt) {
    console.log('connected');
  }
  ws.onmessage = function(msg){
    var returnObject = JSON.parse(msg.data);
    $('#messages').append($('<li>')).append($('<span id="clientId">').text(returnObject.id)).append($('<span id="clientMessage">').text(returnObject.data));
  };
  ws.onerror = function(err){
    console.log("err", err);
  };
  ws.onclose = function close() {
    console.log('disconnected');
  };
});
