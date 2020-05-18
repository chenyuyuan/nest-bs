import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';

import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';

import { RedisModule} from 'nestjs-redis'
import { CacheService } from 'src/cache/cache.service';


@Module({
  imports: [
    TypeOrmModule.forFeature([User]), 
    RedisModule.register({host:'106.54.90.108',port:6379,password:'',db:0})
  ],
  providers: [UserService, CacheService],
  controllers: [UserController]
})
export class UserModule {}