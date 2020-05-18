import { Controller, Get, Post, HttpStatus, Res, Param, Body, NotFoundException,Req,Request,Header } from '@nestjs/common';
import { DataService } from './data.service';
import { SysService } from 'src/sys/sys.service';
import { Data } from './entity/data.entity';
import { CacheService } from 'src/cache/cache.service';
import { DeviceService } from 'src/device/device.service';

function add0(m){return m<10?'0'+m:m }

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
	@Post('/time')
    async time(@Res() res, @Request() request, @Body() body): Promise<string> {
        //"20200415T082803Z"
        var time = "20200517T122650Z"
        var timeformat=time.substring(0,4)+'/'+time.substring(4,6)+'/'+time.substring(6,8)+' '+time.substring(9,11)+':'+time.substring(11,13)+':'+time.substring(13,15)
        console.log(timeformat)
        var t0 = new Date(timeformat)
        var timestamp0 = t0.getTime()
        console.log(timestamp0)
        timestamp0 = timestamp0 + 8*60*60*1000

        var t1 = new Date(timestamp0)
        console.log(t1.getTime())

        var y = t1.getFullYear();
        var m = t1.getMonth()+1;
        var d = t1.getDate();
        var h = t1.getHours();
        var mm = t1.getMinutes();
        var s = t1.getSeconds();
              
        var time1 = y+add0(m)+add0(d)+add0(h)+add0(mm)+add0(s)
        await this.dataService.addData(30000, 1, 1)
        console.log(time1)
        
        return res.status(HttpStatus.OK).json({msg:"success", tip:"成功"});
    }

    @Post('/test')
    async test(@Res() res, @Request() request, @Body() body): Promise<string> {
        //"20200415T082803Z"
        var time = "20200517T122650Z"
        var timeformat=time.substring(0,4)+'/'+time.substring(4,6)+'/'+time.substring(6,8)+' '+time.substring(9,11)+':'+time.substring(11,13)+':'+time.substring(13,15)
        console.log(timeformat)
        var t0 = new Date(timeformat)
        var timestamp0 = t0.getTime()
        console.log(timestamp0)
        timestamp0 = timestamp0 + 8*60*60*1000

        var t1 = new Date(timestamp0)
        console.log(t1.getTime())

        var y = t1.getFullYear();
        var m = t1.getMonth()+1;
        var d = t1.getDate();
        var h = t1.getHours();
        var mm = t1.getMinutes();
        var s = t1.getSeconds();
              
        var time1 = y+add0(m)+add0(d)+add0(h)+add0(mm)+add0(s)
        await this.dataService.addData(30000, 1, 1)
        console.log(time1)
        
        return res.status(HttpStatus.OK).json({msg:"success", tip:"成功"});
    }

    @Get('/getdata')
    async getdata(@Res() res, @Request() request): Promise<string> {
		var device_id = 1;
        var datalist = [];
        var datalistCount = 0;
        var ocdevice_id = (await this.deviceService.findDeviceByDeviceId(device_id))['ocdevice_id']
        while (true) {
            var value = await this.cacheService.lpop('data_'+ocdevice_id);
            var time = await this.cacheService.lpop('time_'+ocdevice_id)
			if(value == null || time == null){
				break;
            }
            time = time.substring(1,17)
            datalist.push({
                'value': value,
                'time': time
            })
        }
        while(datalist.length>20) {
            datalist.pop()
        }
        console.log(datalist)
        console.log("datalist length "+ datalist.length)
        return res.status(HttpStatus.OK).json({msg:"success", tip:"成功", datas: datalist});
	}
	@Post('/device_shadow_push')
    async msgpush(@Res() res, @Request() request, @Body() body): Promise<string> {
        // var user_id = request.session.user_id;
        // console.log(user_id)

        // //await this.articleService.delete(1, 4);
		console.log(body)
        var ocdevice_id = body['deviceId']
        var time = body['service']['eventTime']
        var device = await this.deviceService.findDevice(ocdevice_id);
        var product_id = (await this.deviceService.findProduct(device['ocproduct_id']))['id']
        var datatype = await this.dataService.getDataType(product_id)
        var serviceName = datatype['properties'];
		if(device != null) {
            var device_id = device['id'];
            var value = body['service']['data'][serviceName]
            console.log(value)
            //redis
            await this.cacheService.rpush('data_'+ocdevice_id, value);
            await this.cacheService.rpush('time_'+ocdevice_id, time);

            //mysql
            await this.dataService.addData(value, device_id, datatype['id'])
		}

        return res.status(HttpStatus.OK).json({msg:"success", tip:"成功"});
    }


    @Get('/all')
    async findAll(@Res() res): Promise<string> {
        var nodeCmd = require('node-cmd');

        var a;
        // 'python ../utils/ocapi/testapi.py'
        // nodeCmd.get(
        //   'python ./src/utils/ocapi/oc_get_data.py',
        //   function(err, data, stderr){
        //     console.log("cmd: python ./src/utils/ocapi/get_data.py")
        //     console.log(data)
        //     console.log(err)
        //   }
        // );
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
