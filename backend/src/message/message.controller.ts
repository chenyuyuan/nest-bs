import { Controller, Get, Post, HttpStatus, Res, Param, Body, NotFoundException,Req,Request,Header } from '@nestjs/common';
import { MessageService } from './message.service';
import { AddMessageDTO } from './dto/add-message.dto';
import { Message } from './message.entity';
import { UserService } from 'src/user/user.service';

@Controller('message')
export class MessageController {
    constructor(private readonly messageService: MessageService, private readonly userService:UserService) { }

    // add message
    @Post('/add')
    async addMessage(@Res() res, @Body() addMessageDto:AddMessageDTO ,@Request() request): Promise<string> {
        var sender_id = request.session.user_id;
        var user_id = addMessageDto.user_id;
        var content = addMessageDto.content;

        if(await this.messageService.addMessage(user_id,sender_id,content)!=null){
            return res.status(HttpStatus.OK).json({msg:"message_add_success",tip:"消息添加成功"});
        }
        else {
            console.log("add message: add return null")
        }
    }

    // delete message
    @Get('/delete/:message_id')
    async deleteMessage(@Res() res, @Param() param,@Request() request): Promise<string> {
        var user_id = request.session.user_id;
        //user_id = 1;
        var message_id = param.message_id;

        if(await this.messageService.deleteMessage(user_id,message_id)!=null){
            return res.status(HttpStatus.OK).json({msg:"message_delete_success",tip:"消息删除成功"});
        }
        else {
            console.log("delete message: delete return null")
        }
    }

    // get message
    @Get('/get')
    async getMessage(@Res() res, @Param() param,@Request() request): Promise<string> {
        var user_id = request.session.user_id;
        //user_id = 1;

        var messages = await this.messageService.findMessageByUserId(user_id)
        //console.log(messages.length)
        var msgLen:number = messages.length;

        for (var i = 0;i<msgLen;++i) {
            //console.log(messages[i]['sender_id'])
            var username = (await this.userService.findById(messages[i]['sender_id']))['name']
            messages[i]["sender_name"] = username;
        }

        if(messages!=null){
            return res.status(HttpStatus.OK).json({msg:"message_get_success",tip:"消息查找成功",message:messages});
        }
        else {
            console.log("get message: get return null")
        }
    }





    // add message
    @Post('/addassystem')
    async addMessageAdmin(@Res() res, @Body() addMessageDto:AddMessageDTO ,@Request() request): Promise<string> {
        var sender_id = request.session.user_id;
        var content = addMessageDto.content;
        var user_id = 3;

        if(await this.messageService.addMessage(user_id,sender_id,content)!=null){
            return res.status(HttpStatus.OK).json({msg:"message_add_success",tip:"消息添加成功"});
        }
        else {
            console.log("add message: add return null")
        }
    }


}
