import { Controller, Get, Post, HttpStatus, Res, Param, Body, NotFoundException,Req,Request,Header } from '@nestjs/common';
import { DataService } from './data.service';
import { SysService } from 'src/sys/sys.service';
import { Data } from './entity/data.entity';

@Controller('data')
export class DataController {
    constructor(private readonly dataService: DataService,private readonly sysService: SysService) { }

    @Get('/a')
    async findAll(@Res() res): Promise<string> {
        console.log("[user/all]: got data--------");
  
  
        var nodeCmd = require('node-cmd');

        var a;
        // 'python ../utils/ocapi/testapi.py'
        nodeCmd.get(
          'python ./src/utils/ocapi/get_data.py',
          function(err, data, stderr){
            console.log("cmd: python ./src/utils/ocapi/get_data.py")
            console.log(data)
            console.log(err)
          }
        );
        var device_id = 1
        var datatype_id = 1

        var data: Data = await this.dataService.getDataNew(device_id,datatype_id)
        
        
  
        return res.status(HttpStatus.OK).json({msg:"data_success",tip:"成功",sensordata:data});
    }
    @Get('/datas')
    async findAllData(@Res() res): Promise<string> {
        console.log("[user/all]: got data--------");
  

        var data: Data[] = await this.dataService.getAllData()
        
  
        return res.status(HttpStatus.OK).json({msg:"data_success",tip:"成功",sensordata:data});
    }

}
