var stompClient = null;

//控制连接函数
function setConnected(connected) {
    $("#connect").prop("disabled", connected);
    $("#disconnect").prop("disabled", !connected);
    if (connected) {
        $("#conversation").show();
    }
    else {
        $("#conversation").hide();
    }
    $("#messages").html("");
}

//如果连接就创建stompClient
function connect() {
    //创建一个SockJS
    var socket = new SockJS('/websocket');
    //使用Stomp协议
    stompClient = Stomp.over(socket);
    stompClient.connect({}, function (frame) {
        setConnected(true);
        console.log('Connected: ' + frame);
        //接收controller传回来的数据并解析
        stompClient.subscribe('/chat/message', function (chatting) {
            //chatting是controller对应的处理函数的方法
            //content是后台传回来的Message对象的属性
            showMessage(JSON.parse(chatting.body).content);
        });
    });
}

//不连接就销毁stompClient
function disconnect() {
    if (stompClient != null) {
        stompClient.disconnect();
    }
    setConnected(false);
    console.log("Disconnected");
}

//发送信息
function sendMessage() {
    //键一定要content！必须和后台接收对象的属性一致
    stompClient.send("/app/chatting", {}, JSON.stringify({'content': $("#content").val()}));
}

//显示消息
function showMessage(message) {
    $("#messages").append("<tr><td>" + message + "</td></tr>");
}

//控制函数
$(function () {
    $("form").on('submit', function (e) {
        e.preventDefault();
    });
    $( "#connect" ).click(function() { connect(); });
    $( "#disconnect" ).click(function() { disconnect(); });
    $( "#send" ).click(function() { sendMessage(); });
});
