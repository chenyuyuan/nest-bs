import { Controller, Get, Post, HttpStatus, Res, Param, Body, NotFoundException,Req } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.entity';
import {CacheService} from '../utils/cache.service'

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService,private readonly cacheService: CacheService) { }


  @Get('/all')
  findAll(@Res() res): Promise<User[]> {
    console.log("[user/all]: got data~~~~~~");
    const fs = require('fs');
    const child_process = require('child_process');
    var workerProcess = child_process.spawn('node', ['./src/utils/mail.ts']);
    workerProcess.stdout.on('data', function (data) {
       console.log('stdout: ' + data);
    });
    workerProcess.stderr.on('data', function (data) {
       console.log('stderr: ' + data);
    });
    workerProcess.on('close', function (code) {
       console.log('子进程已退出，退出码 '+code);
    });
    return this.userService.findAll();
  }
  @Post('/login') 
  async login(@Res() res, @Body() name: string, @Body() pwd:string) {
    const post = await this.userService.getUserById(name);
    console.log(name)
    if (!post) throw new NotFoundException('Post does not exist!');
    return res.status(HttpStatus.OK).json(post);
  }

  @Post('/register') 
  async register(@Res() res, @Body() name: string, @Body() pwd:string) {
    const post = await this.userService.getUserById(name);
    if (!post) throw new NotFoundException('Post does not exist!');
    return res.status(HttpStatus.OK).json(post);
  }


  @Get('/getmailcode/:mail') 
  async getMailCode(@Res() res, @Param() param) {
    let code :number = parseInt(String(Math.random() * 10000));
    code = code < 1000 ? code + 1000 : code;
    await this.cacheService.set(param.mail,code);
    await this.cacheService.get(param.mail)
    console.log(await this.cacheService.get(param.mail))
    console.log("邮箱：" + param.mail+ " 验证码：" + code)
    console.log(param.mail)

    
    return res.status(HttpStatus.OK).json();
  }

}