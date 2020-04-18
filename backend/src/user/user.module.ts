import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';

import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';

import { Sys_Mail_Code } from './sys_mail_code.entity'


@Module({
  imports: [TypeOrmModule.forFeature([User,Sys_Mail_Code]), ],
  providers: [UserService],
  controllers: [UserController]
})
export class UserModule {}