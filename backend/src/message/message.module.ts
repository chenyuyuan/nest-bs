import { Module } from '@nestjs/common';
import { MessageController } from './message.controller';
import { MessageService } from './message.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Message } from './message.entity';
import { MessageAdmin } from './message_admin.entity';
import { UserService } from 'src/user/user.service';
import { User } from 'src/user/user.entity';


@Module({
  imports: [TypeOrmModule.forFeature([Message, MessageAdmin, User]), ],
  controllers: [MessageController],
  providers: [MessageService,UserService]
})
export class MessageModule {}
