$(function () {
  var COLORS = ['#FFD700', '#FF8C00', '#FFFF00', '#ADFF2F', '#1E90FF', '#00FF00'];
  var PANEL_RESET_ANIMATION_TIME = 1000;
  var $panel1 = $('.panel1');
  var $panel2 = $('.panel2');
  var $panel3 = $('.panel3');
  var $panel4 = $('.panel4');
  var $panel5 = $('.panel5');
  var $panel6 = $('.panel6');
  var panels = [$panel1, $panel2, $panel3, $panel4, $panel5, $panel6];
  var $actionLog = $('.action-log > ul');
  var $successLog = $('.success-log > ul');
  var $failureLog = $('.failure-log > ul');
  var $userid = $('.userid');
  var $round = $('.round');
  var userid;
  var round;

  var $answer = $('.answer');
  var socket = io();

  function setPanelAction() {
    $panel1.on('click', function () {
      localStorage.setItem(userid, JSON.stringify({ panelNo: 1, round: round }));
      socket.emit('shot panel1', 'shot1');
      $(this).animate({'background-color': '#000', 'color': '#fff'});
      for (var idx = 0; idx < panels.length; idx++) {
        panels[idx].off();
      }
    });
    $panel2.on('click', function () {
      localStorage.setItem(userid, JSON.stringify({ panelNo: 2, round: round }));
      socket.emit('shot panel2', 'shot2');
      $(this).animate({'background-color': '#000', 'color': '#fff'});
      for (var idx = 0; idx < panels.length; idx++) {
        panels[idx].off();
      }
    });
    $panel3.on('click', function () {
      localStorage.setItem(userid, JSON.stringify({ panelNo: 3, round: round }));
      socket.emit('shot panel3', 'shot3');
      $(this).animate({'background-color': '#000', 'color': '#fff'});
      for (var idx = 0; idx < panels.length; idx++) {
        panels[idx].off();
      }
    });
    $panel4.on('click', function () {
      localStorage.setItem(userid, JSON.stringify({ panelNo: 4, round: round }));
      socket.emit('shot panel4', 'shot4');
      $(this).animate({'background-color': '#000', 'color': '#fff'});
      for (var idx = 0; idx < panels.length; idx++) {
        panels[idx].off();
      }
    });
    $panel5.on('click', function () {
      localStorage.setItem(userid, JSON.stringify({ panelNo: 5, round: round }));
      socket.emit('shot panel5', 'shot5');
      $(this).animate({'background-color': '#000', 'color': '#fff'});
      for (var idx = 0; idx < panels.length; idx++) {
        panels[idx].off();
      }
    });
    $panel6.on('click', function () {
      localStorage.setItem(userid, JSON.stringify({ panelNo: 6, round: round }));
      socket.emit('shot panel6', 'shot6');
      $(this).animate({'background-color': '#000', 'color': '#fff'});
      for (var idx = 0; idx < panels.length; idx++) {
        panels[idx].off();
      }
    });
  }
  function highlightAnswerPanel(panelNo) {
    panels[panelNo - 1].animate({'background-color': '#444', 'color': '#fff'});
  }
  setPanelAction();


  socket.on('login', function (data) {
    $userid.text(data.id);
    userid = data.id;
    round = data.round;
    $round.text('Round: ' + round);
  });

  socket.on('answer', function (data) {
    var userAnswerInfo = JSON.parse(localStorage[userid]);
    var userAnswer = userAnswerInfo["panelNo"];
    var userAnswerRound = userAnswerInfo["round"];
    var message = 'GKは' + data.answer + 'を選択';
    if ((data.round == userAnswerRound) && userAnswer) {
      if (data.answer == userAnswer) {
        message += 'セーブされた。';
      }
      else {
        message += 'ゴールにつきささった。';
      }
      $answer.text(message);
    }
    switch (data.answer) {
      case "1":
        highlightAnswerPanel(1);
        break;
      case "2":
        highlightAnswerPanel(2);
        break;
      case "3":
        highlightAnswerPanel(3);
        break;
      case "4":
        highlightAnswerPanel(4);
        break;
      case "5":
        highlightAnswerPanel(5);
        break;
      case "6":
        highlightAnswerPanel(6);
        break;
    }
    for (var i = 0; i < data.successUsers.length; i++) {
      if (userid == data.successUsers[i]) {
        $successLog.prepend('<li class="userid">' + data.successUsers[i] + 'はPK成功。</li>');
      } else {
        $successLog.prepend('<li>' + data.successUsers[i] + 'はPK成功。</li>');
      }
    }
    for (var i = 0; i < data.failureUsers.length; i++) {
      if (userid == data.failureUsers[i]) {
        $failureLog.prepend('<li class="userid">' + data.failureUsers[i] + 'はPK失敗。</li>');
      } else {
        $failureLog.prepend('<li>' + data.failureUsers[i] + 'はPK失敗。</li>');
      }
    }
  });

  socket.on('action log', function(data) {
    $actionLog.prepend('<li>' + data.message + '</li>');
  });

  socket.on('reset panel', function(data) {
    for (var idx = 0; idx < panels.length; idx++) {
      panels[idx].animate({'background-color': COLORS[idx], 'color': '#000'});
    }
    $round.text('Round: ' + data.round);
    round = data.round;
    $answer.text('');
    setPanelAction();
  });
});
