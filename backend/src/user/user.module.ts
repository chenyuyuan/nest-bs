import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';

import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';

import { RedisModule} from 'nestjs-redis'
import { CacheService } from '../utils/cache.service'


@Module({
  imports: [TypeOrmModule.forFeature([User]), RedisModule.register({port: 6379,host: '101.132.105.38',password: '',db: 0})],
  providers: [UserService,CacheService],
  controllers: [UserController]
})
export class UserModule {}