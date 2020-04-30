import { Injectable } from '@nestjs/common';
import { Message } from './message.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MessageAdmin } from './message_admin.entity';

@Injectable()
export class MessageService {
    constructor(
        @InjectRepository(Message)
        private readonly MessageRepository: Repository<Message>,
        @InjectRepository(MessageAdmin)
        private readonly MessageAdminRepository: Repository<MessageAdmin>,
      ) { }
    
      private readonly messages: Message[] = [];
      private readonly message_admins: MessageAdmin[] = [];

      async addMessage(user_id:number, sender_id:number, content:string): Promise<Message> {
        const message = new Message();
        if((await this.MessageRepository.find()).length == 0) {
          message.id=1;
        }
        message.user_id = user_id;
        message.sender_id = sender_id;
        message.content = content;
        return await message.save();//save会返回保存后的对象，包含了自动生成id，insert返回undefined
        // save保存之后，原实体对象上会出现自动生成id，insert插入之后原实体对象不变
        // 这一步为了突出save对实体的改变，使用了自动生成id，如果id不是自动生成，那么只有返回值有区别
      }
      async deleteMessage(user_id:number, message_id:number): Promise<Message> {
        var message: Message = await this.MessageRepository.findOne({user_id:user_id, id:message_id}) 
        return await this.MessageRepository.remove(message);
      }
      async findMessage(message_id:number): Promise<Message> {
        return await this.MessageRepository.findOne({id:message_id});
      }
      async findMessageByUserId(user_id:number): Promise<Message[]> {
        return await this.MessageRepository.find({user_id:user_id});
      }
      async findMessageByUserIdAndSenderId(user_id:number,sender_id:number): Promise<Message[]> {
        return await this.MessageRepository.find({user_id:user_id, sender_id:sender_id});
      }


      async addMessageAdmin(admin_id:number, content:string): Promise<MessageAdmin> {
        const messageadmin = new MessageAdmin();
        if((await this.MessageAdminRepository.find()).length == 0) {
          messageadmin.id=1;
        }
        messageadmin.admin_id = admin_id;
        messageadmin.content = content;
        return await messageadmin.save();//save会返回保存后的对象，包含了自动生成id，insert返回undefined
        // save保存之后，原实体对象上会出现自动生成id，insert插入之后原实体对象不变
        // 这一步为了突出save对实体的改变，使用了自动生成id，如果id不是自动生成，那么只有返回值有区别
      }
      async delelteMessageAdmin(message_id:number): Promise<MessageAdmin> {
        var messageadmin: MessageAdmin = await this.MessageAdminRepository.findOne({id:message_id}) 
        return await this.MessageAdminRepository.remove(messageadmin);
      }
      async findMessageAdmins(): Promise<MessageAdmin[]> {
        return await this.MessageAdminRepository.find();
      }
      


}
