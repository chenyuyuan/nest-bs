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
    //保存mail:code，到Redis缓存
    await this.cacheService.set(param.mail,code);
    //await this.cacheService.get(param.mail)
    //console.log(await this.cacheService.get(param.mail))
    console.log("邮箱：" + param.mail+ " 验证码：" + code)
    console.log(param.mail)
    //启动发邮件线程
    const fs = require('fs');
    const child_process = require('child_process');

    var sendcontent = "验证码是" + code;
    var workerProcess = child_process.spawn('node', ['./src/utils/mail.ts', param.mail, sendcontent]);
    workerProcess.stdout.on('data', function (data) {
       console.log('stdout: ' + data);
    });
    workerProcess.stderr.on('data', function (data) {
       console.log('stderr: ' + data);
       return res.status(HttpStatus.EXPECTATION_FAILED).json("发送失败");
    });
    workerProcess.on('close', function (code) {
       console.log('子进程已退出，退出码 '+code);
    });
    return res.status(HttpStatus.OK).json("发送成功");
  }

  @Get('/verifymailcode/:mail/:code') 
  async verifyMailCode(@Res() res, @Param() param) {
    var reqcode = param.code;
    var code = await this.cacheService.get(param.mail)

    if(reqcode === code) {
      return res.status(HttpStatus.OK).json("验证码正确");
    }
    else {
      return res.status(HttpStatus.EXPECTATION_FAILED).json("验证码错误");
    }
    
  }

}