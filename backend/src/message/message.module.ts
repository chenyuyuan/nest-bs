import { Module } from '@nestjs/common';
import { MessageController } from './message.controller';
import { MessageService } from './message.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Message } from './message.entity';
import { MessageAdmin } from './message_admin.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Message, MessageAdmin]), ],
  controllers: [MessageController],
  providers: [MessageService]
})
export class MessageModule {}
