import { Module } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { Admin } from './admin.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DeviceService } from 'src/device/device.service';
import { Device } from 'src/device/device.entity';
import { Product } from 'src/device/product.entity';
import { UserDevice } from 'src/device/userdevice.entity';
import { AlarmValue } from 'src/device/alarm_value.entity';
import { MessageAdmin } from 'src/message/message_admin.entity';
import { Message } from 'src/message/message.entity';
import { MessageService } from 'src/message/message.service';
import { Article } from 'src/article/entity/article.entity';
import { ArticleComment } from 'src/article/entity/article-comment.entity';
import { ArticleService } from 'src/article/article.service';
import { UserService } from 'src/user/user.service';
import { User } from 'src/user/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Admin, Device,Product,UserDevice,AlarmValue,  Message, MessageAdmin,  Article, ArticleComment,  User]), ],
  controllers: [AdminController],
  providers: [AdminService,DeviceService,MessageService,ArticleService,UserService]
})
export class AdminModule {}
