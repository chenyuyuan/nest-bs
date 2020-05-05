import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';

import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';

import { Sys_Mail_Code } from './sys_mail_code.entity'

import { RedisModule} from 'nestjs-redis'
import { CacheService } from 'src/cache/cache.service';


@Module({
  imports: [
    TypeOrmModule.forFeature([User,Sys_Mail_Code]), 
    RedisModule.register({host:'101.132.105.38',port:6379,password:'',db:0})
  ],
  providers: [UserService, CacheService],
  controllers: [UserController]
})
export class UserModule {}