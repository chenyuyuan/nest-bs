import { Controller, Get, Post, HttpStatus, Res, Param, Body, NotFoundException,Req,Request,Header } from '@nestjs/common';
import { DataService } from './data.service';
import { SysService } from 'src/sys/sys.service';
import { Data } from './entity/data.entity';
import { CacheService } from 'src/cache/cache.service';
import { DeviceService } from 'src/device/device.service';
import { UserService } from 'src/user/user.service';
import { MessageService } from 'src/message/message.service';

function add0(m){return m<10?'0'+m:m }

@Controller('data')
export class DataController {
    constructor(private readonly dataService: DataService, private readonly deviceService: DeviceService, private readonly cacheService: CacheService,
        private readonly userService: UserService, private readonly messageService: MessageService) { }



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

    @Get('/getdata/:device_id')
    async getdata(@Res() res, @Request() request, @Param() param,): Promise<string> {
        var device_id = 1;
        device_id = param.device_id
        var datalist = [];
        var timelist = [];
        var datalistCount = 0;
        var device = await this.deviceService.findDeviceByDeviceId(device_id)
        if(device == null) {
            console.log("未找到设备")
            return res.status(HttpStatus.OK).json({msg:"not_device", tip:"未找到设备"});
        }
        var ocdevice_id = device['ocdevice_id']
        var device = await this.deviceService.findDeviceByDeviceId(device_id);
        var product_id = (await this.deviceService.findProduct(device['ocproduct_id']))['id']
        var datatypes = await this.dataService.getDataTypes(product_id);
        
        for (var i = 0;i<datatypes.length;++i) {
            var data0 = [];
            while (true) {
                var serviceName = datatypes[i]['properties'];
                var timevalue = await this.cacheService.lpop(serviceName+'_'+ocdevice_id);
                if(timevalue == null){
                    break;
                }
                var time = timevalue.substring(1,15)
                var value = timevalue.substring(15,timevalue.length-1)
                data0.push({'value': value, 'time': time})
            }
            while(data0.length>20) {
                data0.pop()
            }
            datalist.push(data0)
        }
        console.log(datalist)
        // console.log("datalist length "+ datalist.length)
        return res.status(HttpStatus.OK).json({msg:"success", tip:"成功", datas: datalist, datatype: datatypes});
    }
    @Get('/getdataall/:device_id')
    async getdataall(@Res() res, @Request() request, @Param() param,): Promise<string> {
        var device_id = param.device_id
        var datalist = []
        var device = await this.deviceService.findDeviceByDeviceId(device_id);
        var product_id = (await this.deviceService.findProduct(device['ocproduct_id']))['id']
        var datatypes = await this.dataService.getDataTypes(product_id);

        var datas = await this.dataService.getAllDataByDeviceId(device_id)

        var datalist = []
        for(var i = 0;i<datatypes.length;++i) {
            var data0 = []
            for(var j = 0;j < datas.length;++j) {
                if(datatypes[i]['id'] == datas[j]['datatype_id']) {
                    data0.push(datas[j])
                }
            }
            datalist.push(data0)
        }

        //console.log("datalist "+ datalist)
        return res.status(HttpStatus.OK).json({msg:"success", tip:"成功", sensordata: datas, datalist:datalist});
	}
	@Post('/device_shadow_push')
    async msgpush(@Res() res, @Request() request, @Body() body): Promise<string> {
		// console.log(body)
        var ocdevice_id = body['deviceId']
        //消息推送测试用的
        if(ocdevice_id == '01006f25-ab60-4a7e-8b0a-6dcfa15e43cc') {return res.status(HttpStatus.OK).json({msg:"success", tip:"成功"});}
        
        var time = body['service']['eventTime']
        var timeformat=time.substring(0,4)+'/'+time.substring(4,6)+'/'+time.substring(6,8)+' '+time.substring(9,11)+':'+time.substring(11,13)+':'+time.substring(13,15)
        var t0 = new Date(timeformat)
        var timestamp0 = t0.getTime()
        timestamp0 = timestamp0 + 8*60*60*1000
        var t1 = new Date(timestamp0)

        var y = t1.getFullYear();var m = t1.getMonth()+1;var d = t1.getDate();var h = t1.getHours();var mm = t1.getMinutes();var s = t1.getSeconds();
              
        var time1 = y+add0(m)+add0(d)+add0(h)+add0(mm)+add0(s)

        var device = await this.deviceService.findDevice(ocdevice_id);
        var product_id = (await this.deviceService.findProduct(device['ocproduct_id']))['id']
        var datatypes = await this.dataService.getDataTypes(product_id)
		if(device != null) {
            for(var i = 0;i<datatypes.length;++i) {
                var serviceName = datatypes[i]['properties'];
                var device_id = device['id'];
                var value = body['service']['data'][serviceName]
                console.log("value: "+value+", time: "+time1)
                //redis
                var timevalue = time1 + value
                // console.log(timevalue)
                await this.cacheService.rpush(serviceName+'_'+ocdevice_id, timevalue);
                //mysql
                await this.dataService.addData(value, device_id, datatypes[i]['id'])

                //发送预警消息
                var alarm_value_up = await this.deviceService.findAlarmValue(device_id, datatypes[i]['id'], 1)
                var alarm_value_down = await this.deviceService.findAlarmValue(device_id, datatypes[i]['id'], 0)
                var user_id = (await this.deviceService.findUserDeviceByDeviceId(device_id))['user_id']
                //console.log(device_id)
                //console.log(user_id)
                var value0 = value;
                if(datatypes[i].operation=='/') {
                    value0 = value / 1000;
                }
                var sendcontent = ""
                if(alarm_value_up!=null&&value0>parseFloat(alarm_value_up.value)) {
                    sendcontent = "您的数据已超上限值，达" + value0;
                    if(alarm_value_up.send_mail==1){
                        const fs = require('fs');
                        const child_process = require('child_process');
                        var mail = (await this.userService.findById(user_id))['mail']
                        var workerProcess = child_process.spawn('node', ['./src/utils/mail.ts', mail, sendcontent]);
                        workerProcess.stdout.on('data', function (data) {
                            // console.log('stdout: ' + data);
                        });
                        workerProcess.stderr.on('data', function (data) {
                        //    console.log('stderr: ' + data);
                           return res.status(HttpStatus.EXPECTATION_FAILED).json({msg:"mail_sended_failed",tip:"预警邮箱发送失败"});
                        });
                        workerProcess.on('close', function (code) {
                            // console.log('子进程已退出，退出码 '+code);
                        });
                    }
                    if(alarm_value_up.send_message_in_website==1) {
                        await this.messageService.addMessage(user_id,3,sendcontent);
                    }
                }
                else if(alarm_value_down!=null&&value0<parseFloat(alarm_value_down.value)) {
                    sendcontent = "您的数据已低于下限值，达" + value0;
                    if(alarm_value_down.send_mail==1){
                        const fs = require('fs');
                        const child_process = require('child_process');
                        var mail = (await this.userService.findById(user_id))['mail']
                        var workerProcess = child_process.spawn('node', ['./src/utils/mail.ts', mail, sendcontent]);
                        workerProcess.stdout.on('data', function (data) {
                            // console.log('stdout: ' + data);
                        });
                        workerProcess.stderr.on('data', function (data) {
                        //    console.log('stderr: ' + data);
                           return res.status(HttpStatus.EXPECTATION_FAILED).json({msg:"mail_sended_failed",tip:"预警邮箱发送失败"});
                        });
                        workerProcess.on('close', function (code) {
                            // console.log('子进程已退出，退出码 '+code);
                        });
                    }
                    if(alarm_value_down.send_message_in_website==1) {
                        await this.messageService.addMessage(user_id,3,sendcontent);
                    }
                }

            }
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
