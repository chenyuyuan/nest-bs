import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';

import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';

import { RedisModule} from 'nestjs-redis'
import { CacheService } from '../utils/cache.service'
import { Sys_Mail_Code } from './sys_mail_code.entity'


@Module({
  imports: [TypeOrmModule.forFeature([User,Sys_Mail_Code]), RedisModule.register({port: 6379,host: '101.132.105.38',password: '',db: 0})],
  providers: [UserService,CacheService],
  controllers: [UserController]
})
export class UserModule {}