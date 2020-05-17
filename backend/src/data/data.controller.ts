import { Controller, Get, Post, HttpStatus, Res, Param, Body, NotFoundException,Req,Request,Header } from '@nestjs/common';
import { DataService } from './data.service';
import { SysService } from 'src/sys/sys.service';
import { Data } from './entity/data.entity';
import { CacheService } from 'src/cache/cache.service';
import { DeviceService } from 'src/device/device.service';

@Controller('data')
export class DataController {
    constructor(private readonly dataService: DataService, private readonly deviceService: DeviceService, private readonly cacheService: CacheService) { }



    @Get('/b')
    async b(@Res() res, @Request() request): Promise<string> {
        await this.cacheService.rpush("2","1");
        await this.cacheService.rpush("2","2");
        await this.cacheService.rpush("2","3");
        while (true) {
			var list = await this.cacheService.lpop("2");
			console.log(list)
			if(list == null){
				break;
			}
        }

        return res.status(HttpStatus.OK).json({msg:"success", tip:"成功"});
	}
	@Post('/test')
    async test(@Res() res, @Request() request, @Body() body): Promise<string> {
        //"20200415T082803Z"
        var timestr = "20200415T082803Z"
        var timeformat=timestr.substring(0,4)+'/'+timestr.substring(4,6)+'/'+timestr.substring(6,8)+' '+timestr.substring(9,11)+':'+timestr.substring(11,13)+':'+timestr.substring(13,15)
        var t = new Date(timeformat)
        console.log("timestamp"+t.getTime())

        return res.status(HttpStatus.OK).json({msg:"success", tip:"成功"});
    }

    @Get('/getdata')
    async getdata(@Res() res, @Request() request): Promise<string> {
		var device_id = 1;
		var list:number[];
        while (true) {
			var data = await this.cacheService.lpop(device_id.toString());
			if(list == null){
				break;
            }
            list.push(data)
        }
		console.log(list)
        return res.status(HttpStatus.OK).json({msg:"success", tip:"成功", datas: list});
	}
	@Post('/device_shadow_push')
    async msgpush(@Res() res, @Request() request, @Body() body): Promise<string> {
        // var user_id = request.session.user_id;
        // console.log(user_id)

        // //await this.articleService.delete(1, 4);
		console.log(body)
		var ocdevice_id = body['devieId']
        var device = await this.deviceService.findDevice(ocdevice_id);
        var serviceName = 'up';
		if(device != null) {
            var device_id = device['id'];
            var value = body['service']['data'][serviceName]
            //redis
            await this.cacheService.rpush(device_id.toString(), value);
            //mysql

            var timestr = body['service']['eventTime']
            var timeformat=timestr.substring(0,4)+timestr.substring(4,6)+timestr.substring(6,8)+timestr.substring(9,11)+timestr.substring(11,13)+timestr.substring(13,15)
            var datatype_id = 1
            await this.dataService.addData(value, device_id, datatype_id, timeformat)
		}

		

        return res.status(HttpStatus.OK).json({msg:"success", tip:"成功"});
    }


    @Get('/all')
    async findAll(@Res() res): Promise<string> {
        var nodeCmd = require('node-cmd');

        var a;
        // 'python ../utils/ocapi/testapi.py'
        nodeCmd.get(
          'python ./src/utils/ocapi/oc_get_data.py',
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
        
      
        var data: Data[] = await this.dataService.getAllData()
        return res.status(HttpStatus.OK).json({msg:"data_success",tip:"成功",sensordata:data});
    }

}
