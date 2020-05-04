import { Controller, Get, Post, HttpStatus, Res, Param, Body, NotFoundException,Req,Request,Header } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminLoginUserDTO } from './dto/admin-login-user.dto';


@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) { }


  @Post('/login') 
  async login(@Res() res, @Body() adminLoginUserDTO: AdminLoginUserDTO, @Request() request) {

    // res.setHeader("Access-Control-Allow-Headers", "X-Requested-With, accept, content-type");
    // res.setHeader("Access-Control-Allow-Methods", "GET, HEAD, POST, PUT, DELETE, TRACE, OPTIONS, PATCH");
    // res.setHeader("Access-Control-Allow-Origin", "http://localhost:8080");
    // res.setHeader("Access-Control-Allow-Credentials", "true");
    //session
    request.session.username = adminLoginUserDTO.name;
    request.session.user_id = (await this.adminService.getUserByName(loginUserDTO.name)).user_id;

    const user = await this.userService.getUserByName(loginUserDTO.name);
    console.log("用户登录："+loginUserDTO.name + request.session.user_id)
    if (!user) throw new NotFoundException('User does not exist!');
    return res.status(HttpStatus.OK).json({msg:"login_success",tip:"登录成功"});
  }

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
}
