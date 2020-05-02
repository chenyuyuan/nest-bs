import { Controller, Get, Post, HttpStatus, Res, Param, Body, NotFoundException,Req,Request,Header } from '@nestjs/common';


@Controller('admin')
export class AdminController {


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
