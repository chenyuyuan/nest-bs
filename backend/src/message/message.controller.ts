import { Controller, Get, Post, HttpStatus, Res, Param, Body, NotFoundException,Req,Request,Header } from '@nestjs/common';
import { MessageService } from './message.service';
import { AddMessageDTO } from './dto/add-message.dto';
import { Message } from './message.entity';

@Controller('message')
export class MessageController {
    constructor(private readonly messageService: MessageService) { }

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

        var messages: Message[] = await this.messageService.findMessageByUserId(user_id)

        if(messages!=null){
            return res.status(HttpStatus.OK).json({msg:"message_get_success",tip:"消息查找成功",message:messages});
        }
        else {
            console.log("get message: get return null")
        }
    }


}
