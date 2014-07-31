$(function () {
  var $panel1 = $('.panel1');
  var $panel2 = $('.panel2');
  var $panel3 = $('.panel3');
  var $panel4 = $('.panel4');
  var $panel5 = $('.panel5');
  var $panel6 = $('.panel6');
  var $actionLog = $('.action-log > ul');
  var $userid = $('.userid');
  var userid;

  var $answer = $('.answer');
  var socket = io();
  console.log(socket);

  $panel1.on('click', function () {
    localStorage.setItem(userid, 1);
    socket.emit('shot panel1', 'shot1');
  });
  $panel2.on('click', function () {
    localStorage.setItem(userid, 2);
    socket.emit('shot panel2', 'shot2');
  });
  $panel3.on('click', function () {
    localStorage.setItem(userid, 3);
    socket.emit('shot panel3', 'shot3');
  });
  $panel4.on('click', function () {
    localStorage.setItem(userid, 4);
    socket.emit('shot panel4', 'shot4');
  });
  $panel5.on('click', function () {
    localStorage.setItem(userid, 5);
    socket.emit('shot panel5', 'shot5');
  });
  $panel6.on('click', function () {
    localStorage.setItem(userid, 6);
    socket.emit('shot panel6', 'shot6');
  });

  socket.on('login', function (id) {
    $userid.text(id);
    userid = id;
  });

  socket.on('answer', function (data) {
    var userAnswer = localStorage[userid];
    console.log(userAnswer);
    var message = 'GKは' + data.answer + 'を選択';
    if (userAnswer) {
      if (data.answer == userAnswer) {
        message += 'セーブされた。';
      }
      else {
        message += 'ゴールにつきささった。';
      }
      $answer.text(message);
    }
  });

  socket.on('action log', function(data) {
    $actionLog.prepend('<li>' + data.message + '</li>');
  });
});
