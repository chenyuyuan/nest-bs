import { Controller, Get, Post, HttpStatus, Res, Param, Body, NotFoundException,Req,Request,Header } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminLoginUserDTO } from './dto/admin-login-user.dto';


@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) { }


  @Post('/login') 
  async login(@Res() res, @Body() adminLoginUserDTO: AdminLoginUserDTO, @Request() request) {

    //session
    request.session.adminname = adminLoginUserDTO.name;
    const admin = await this.adminService.findById(adminLoginUserDTO.name);
    request.session.admin_id = admin.admin_id;

    
    console.log("用户登录："+adminLoginUserDTO.name + request.session.user_id)
    if (!admin) throw new NotFoundException('Admin does not exist!');
    return res.status(HttpStatus.OK).json({msg:"admin_login_success",tip:"管理员登录成功"});
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
