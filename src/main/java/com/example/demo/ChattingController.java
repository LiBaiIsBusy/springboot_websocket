package com.example.demo;


import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
public class ChattingController {


    // /chatting的处理函数
    @MessageMapping("/chatting")
    //将结果发送到/chat/message
    @SendTo("/chat/message")
    //这里传进的参数是Message对象，对应的键是content，
    //所以后台的Message对象一定要有content属性
    public Message chatting(Message message) throws Exception {
        //停1秒，让后台有时间去处理消息
        Thread.sleep(1000);
        //返回Message的json形式
        return new Message(message.getContent());
    }

}
