import { Controller, Get, Post, HttpStatus, Res, Param, Body, NotFoundException,Req,Request,Header } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.entity';
import { RegisterUserDTO } from './dto/register-user.dto';
import { LoginUserDTO } from './dto/login-user.dto';
import 'axios';
import { sys_config } from '../utils/sys_config'
import { async } from 'rxjs/internal/scheduler/async';
import { CacheService } from 'src/cache/cache.service';


@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService,private readonly cacheService: CacheService) { }



  @Get('/all')
  async findAll(@Res() res): Promise<string> {
    console.log("[user/all]: got data--------");


    var nodeCmd = require('node-cmd');

    var a;
    // 'python ../utils/ocapi/testapi.py'
    nodeCmd.get(
      'python ./src/utils/ocapi/get_token.py',
      function(err, data, stderr){
        console.log("cmd: python ./src/utils/ocapi/get_token.py")
        console.log(data)
        console.log(err)
      }
    );
    
    // var xauthtoken = await this.cacheService.get("xauthtoken")
    // console.log(xauthtoken)

    return res.status(HttpStatus.OK).json({msg:"success",tip:"成功"});
  }
  @Post('/login') 
  async login(@Res() res, @Body() loginUserDTO: LoginUserDTO, @Request() request) {

    const user = await this.userService.getUserByName(loginUserDTO.name);
    if (!user || user.pwd != loginUserDTO.pwd) {
      return res.status(HttpStatus.OK).json({msg:"login_failed",tip:"登录失败"});
    }
    request.session.username = loginUserDTO.name;
    request.session.user_id = user.user_id;

    
    console.log("用户登录："+loginUserDTO.name + request.session.user_id)

    return res.status(HttpStatus.OK).json({msg:"login_success",tip:"登录成功"});
  }
  

  @Post('/register') 
  async register(@Res() res, @Body() registerUserDTO:RegisterUserDTO) {
    var req_code = registerUserDTO.mail_code;
    var code = await this.cacheService.get(registerUserDTO.mail)
    //var code = await this.userService.getMailCode(registerUserDTO.mail)

    console.log("用户发送的验证码："+req_code+"正确的验证码："+code)
    if(await this.userService.getUserByName(registerUserDTO.name) != null) {
      return res.status(HttpStatus.OK).json({msg:"user_exists",tip:"用户已存在"});
    }

    if(req_code == code) {
      if((await this.userService.addUser(registerUserDTO.name, registerUserDTO.mail, registerUserDTO.pwd, registerUserDTO.phone)) !==null){
        return res.status(HttpStatus.OK).json({msg:"register_success",tip:"注册成功"});
      }
      else {
        return res.status(HttpStatus.OK).json({msg:"register_failed",tip:"数据库写入错误"});
      }
      
    }
    else {
      return res.status(HttpStatus.OK).json({msg:"wrong_mail_code",tip:"验证码错误"});
    }
    
  }


  @Get('/getmailcode/:mail') 
  async getMailCode(@Res() res, @Param() param) {
    let code :number = parseInt(String(Math.random() * 10000));
    code = code < 1000 ? code + 1000 : code;
    //保存mail:code，到Redis缓存
    await this.cacheService.set(param.mail,code);
    //await this.userService.setMailCode(param.mail,String(code))

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
       return res.status(HttpStatus.EXPECTATION_FAILED).json({msg:"mail_sended_failed",tip:"发送失败", mail_code:code});
    });
    workerProcess.on('close', function (code) {
       console.log('子进程已退出，退出码 '+code);
    });
    return res.status(HttpStatus.OK).json({msg:"mail_send_success",tip:"发送成功"});
  }

  @Get('/ifusernameexists/:name') 
  async ifUserNameExists(@Res() res, @Param() param) {
    var name = param.name;
    


    if(await this.userService.getUserByName(name) == null) {
      return res.status(HttpStatus.OK).json({msg:"no_exists",tip:"用户名不存在"});
    }
    else {
      return res.status(HttpStatus.OK).json({msg:"exists",tip:"用户名存在"});
    }
    
  }
  @Get('/changepwd/:mail/:code/:pwd') 
  async changePwd(@Res() res, @Param() param) {
    var mail = param.mail;
    var req_code = param.code;
    var pwd = param.pwd;

    var code = await this.cacheService.get(mail);
    //var code = await this.userService.getMailCode(mail)


    if(req_code === code) {
      if (await this.userService.updatePwd(mail, pwd)!==null) {
        return res.status(HttpStatus.OK).json({msg:"change_pwd_susscess", tip:"密码修改成功"});
      }
      else {
        return res.status(HttpStatus.OK).json({msg:"change_pwd_failed", tip:"修改失败"});
      }

      
    }
    else {
      return res.status(HttpStatus.OK).json({msg:"wrong_mail_code", tip:"验证码错误"});
    }
    
  }


  @Get('/user') 
  async getUser(@Res() res, @Param() param, @Request() request) { // correct
    var user_id = request.session.user_id;
    //user_id = 1;
    var user:User = await this.userService.findById(user_id);
    user.pwd = "";

    if (await this.userService.findById(user_id)!==null) {
      return res.status(HttpStatus.OK).json({msg:"get_user_success", tip:"成功",user:user});
    }
  }

  // PROFILE
  @Get('/changepwdnomailcode/:pwd') 
  async changePwdNoMailCode(@Res() res, @Param() param, @Request() request) { // correct
    var pwd = param.pwd;
    var user_id = request.session.user_id;
    //user_id = 1;

    if (await this.userService.updatePwdNoMailCode(user_id, pwd)!==null) {
      return res.status(HttpStatus.OK).json({msg:"change_pwd_susscess", tip:"密码修改成功"});
    }
  }
  @Get('/changemail/:mail/:code') 
  async changeMail(@Res() res, @Param() param, @Request() request) { // correct
    var user_id = request.session.user_id;
    //user_id = 1;
    var code = await this.cacheService.get(param.mail)
    if(param.code != code) {
      return res.status(HttpStatus.OK).json({msg:"wrong_mail_code", tip:"验证码错误"});
    }
    if (await this.userService.updateMail(user_id, param.mail)!==null) {
      return res.status(HttpStatus.OK).json({msg:"change_mail_susscess", tip:"邮箱修改成功"});
    }
  }
  @Get('/changename/:name') 
  async changeName(@Res() res, @Param() param, @Request() request) { // correct
    var name = param.name;
    var user_id = request.session.user_id;
    //user_id = 1;
    var returnMsg = await this.userService.updateName(user_id, name)

    if (returnMsg=="change_name_success") {
      return res.status(HttpStatus.OK).json({msg:"change_name_success", tip:"昵称修改成功"});
    }
    else if(returnMsg == "user_name_exists") {
      return res.status(HttpStatus.OK).json({msg:"user_name_exists", tip:"用户名已存在"});
    }
  }


  @Get('/set/:a')
  async cacheSet(@Res() res, @Param() param): Promise<string> {

    await this.cacheService.set("a",param.a);
    return res.status(HttpStatus.OK).json({msg:"success",tip:"成功"});
  }
  @Get('/get')
  async cacheGet(@Res() res, @Param() param): Promise<string> {

    var a = await this.cacheService.get("a");
    console.log("cache, a: " + a)
    return res.status(HttpStatus.OK).json({msg:"success",tip:"成功",a:a});
  }




}