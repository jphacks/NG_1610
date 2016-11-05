<!doctype html>
<html>
  <head>
    <title>Socket.IO chat</title>
    <link rel="stylesheet" href="{{url('css', filepath="style.css")}}"></link>
  </head>
  <body>
    <div id="header">
    <div class="wrapper">
    RAIDEN
    </div>
    </div>
    <div id="container">
    <div id="containerInner">
    <div id="nav">
    コントローラ
    <div class="center">
    <a href="#" id="forward" class="arrow-button top"></a> 
    </div>
    <ul class="global_menu">
    <li>
    <a href="#" id="left-turn" class="arrow-button left"></a> 
    </li>
    <li>
    <a href="#" id="stop" class="stop"></a> 
    </li>
    <li>
    <a href="#" id="right-turn" class="arrow-button right"></a> 
    </li>
    </ul>
    <div class="center">
    <a href="#" id="back" class="arrow-button bottom"></a> 
    </div>

    </div>
    <div id="content">
    <div id="contentInner">
    動画
    </div>
    </div>
    <div id="aside">ステータス表示</div>
    
    <script src="{{url('js', filepath="jquery-1.11.1.js")}}"></script>
    <!-- <script src="//code.jquery.com/jquery-1.11.1.js"></script> -->
    <script src="{{url('js', filepath="client.js")}}"></script>
    </div>
    </div>
    <ul id="messages"></ul>
    <form action="">
      <input id="m" autocomplete="off"/><button type="submit">Send</button>
    </form>
  </body>
</html>
