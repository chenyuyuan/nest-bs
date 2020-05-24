import { Controller, Get, Post, HttpStatus, Res, Param, Body, NotFoundException,Req,Request } from '@nestjs/common';
import { DeviceService } from './device.service';

import { AddDeviceDTO } from './dto/add-device.dto'

import 'axios';
import { sys_config } from '../utils/sys_config'
import { UpdateDeviceDTO } from './dto/update-device.dto';
import { SetAlarmValueDTO } from './dto/set-alarmvalue.dto';
import { DataService } from 'src/data/data.service';
import { AlarmValue } from './alarm_value.entity';


@Controller('device')
export class DeviceController {
    constructor(private readonly deviceService: DeviceService, private readonly dataService: DataService) { }

    @Get('/products')
    async getProducts(@Res() res): Promise<string> {
        return res.status(HttpStatus.OK).json({msg:"success",tip:"成功",products:(await this.deviceService.findAllProduct())});
    }

    @Post('/adddevice') 
    async addDevice(@Res() res, @Body() addDeviceDTO: AddDeviceDTO, @Request() request) {
  
      //session
        var user_id: number = request.session.user_id;
        if(user_id == null) {
            return res.status(HttpStatus.OK).json({msg:"without_login", tip:"请先登录"});
        }
        var ocproduct_id: string = addDeviceDTO.ocproduct_id
        var ocdevice_id: string = addDeviceDTO.ocdevice_id
        console.log("ocproduct_id:"+ ocproduct_id + " ocdevice_id:" +ocdevice_id +" user_id: "+ user_id+" username"+request.session.user_id)
        var flag = await this.deviceService.addDevice(ocproduct_id, ocdevice_id, user_id)
    //   const user = await this.deviceService.getUserByName(loginUserDTO.name)
    //   if (!user) throw new NotFoundException('User does not exist!');
        if(flag == 1) {
            return res.status(HttpStatus.OK).json({msg: "add_device_success", tip: "添加设备成功"});
        }
        if(flag == 2) {
            return res.status(HttpStatus.OK).json({msg: "device_not_exists", tip: "设备不存在"});
        }
        if(flag == 3) {
            return res.status(HttpStatus.OK).json({msg: "user_device_exists", tip: "设备已存在"});
        }
        
    }

    @Get('/device/:ocdevice_id') // correct ✔
    async getDevice(@Res() res, @Param() param,@Request() request): Promise<string> {
        console.log("/device/device/ "+param.ocdevice_id)
        console.log(request.session.user_id)
        //加身份认证

        return res.status(HttpStatus.OK).json({msg:"success",tip:"/device成功",device:(await this.deviceService.findDevice(param.ocdevice_id))});
    }
    @Get('/delete/:device_id') // correct ✔
    async deleteDevice(@Res() res, @Param() param, @Request() request): Promise<string> {

        var user_id:number = request.session.user_id;
        
        //var user_id = 1
        await this.deviceService.deleteUserDevice(user_id, param.device_id)
        return res.status(HttpStatus.OK).json({msg:"device_delete_success",tip:"设备删除成功",});
    }
    @Post('/update') // correct ✔
    async updateDevice(@Res() res,@Request() request,@Body() updateDeviceDTO:UpdateDeviceDTO): Promise<string> {
        
        var user_id:number = request.session.user_id;
        var device_id:number = updateDeviceDTO.device_id;
        var name:string = updateDeviceDTO.name;
        var imei:string = updateDeviceDTO.imei;
        var imsi:string = updateDeviceDTO.imsi;

        //var user_id = 1
        await this.deviceService.updateDevice(device_id, name,imei,imsi)
        return res.status(HttpStatus.OK).json({msg:"device_update_success",tip:"设备更新成功",});
    }
    @Get('/my_device') // correct ✔
    async getMyDevice(@Res() res,@Request() request): Promise<string> {
        var user_id:number = request.session.user_id;
        //var user_id:number = 1;
        console.log("user_id: "+ user_id)
        //await this.deviceService.findDeviceByUserId(user_id)
        return res.status(HttpStatus.OK).json({msg:"success",tip:"mydevice成功",devices:(await this.deviceService.findDeviceByUserId(user_id))});
    }
    
    @Get('/product/:ocproduct_id') // correct ✔
    async getProduct(@Res() res,@Param() param): Promise<string> {
        
        return res.status(HttpStatus.OK).json({msg:"success",tip:"成功",products:(await this.deviceService.findProduct(param.ocproduct_id))});
    }



    @Get('/getalarmvalue/:device_id') // correct ✔
    async getAlarmValue(@Res() res,@Param() param): Promise<string> {
        var device_id = param.device_id
        var device = await this.deviceService.findDeviceByDeviceId(device_id);
        var product_id = (await this.deviceService.findProduct(device['ocproduct_id']))['id']
        var datatypes = await this.dataService.getDataTypes(product_id);

        for(var i = 0; i<datatypes.length;++i) {
            var alarm_value_down = await this.deviceService.findAlarmValue(device_id, datatypes[i]['id'],0)
            var alarm_value_up = await this.deviceService.findAlarmValue(device_id, datatypes[i]['id'],1)

            console.log(alarm_value_down)
            datatypes[i]['down']=alarm_value_down
            datatypes[i]['up']=alarm_value_up
        }

        return res.status(HttpStatus.OK).json({msg:"success",tip:"成功",datatype:datatypes});
    }

    @Post('/setalarmvalue') // correct ✔
    async setAlarmValue(@Res() res,@Param() param,@Body() setAlarmValueDTO:SetAlarmValueDTO): Promise<string> {
        var result = await this.deviceService.addAlarmValue(setAlarmValueDTO.value,setAlarmValueDTO.device_id,setAlarmValueDTO.datatype_id,
            setAlarmValueDTO.up_down,1,setAlarmValueDTO.send_mail,0,setAlarmValueDTO.send_message)
        console.log(result)
        return res.status(HttpStatus.OK).json({msg:"set_alarmvalue_success",tip:"设置预警值成功"});
    }




}
