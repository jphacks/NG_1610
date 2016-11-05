<!doctype html>
<html>
  <head>
    <title>Socket.IO chat</title>
    <link rel="stylesheet" href="{{url('css', filepath="style.css")}}"></link>
  </head>
  <body>
    <ul id="messages"></ul>
    <form action="">
      <input id="m" autocomplete="off"/><button type="submit">Send</button>
    </form>
    <script src="{{url('js', filepath="jquery-1.11.1.js")}}"></script>
    <!-- <script src="//code.jquery.com/jquery-1.11.1.js"></script> -->
    <script src="{{url('js', filepath="client.js")}}"></script>
  </body>
</html>
