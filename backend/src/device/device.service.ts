import { Injectable } from '@nestjs/common';
// ORM
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Device } from './device.entity';
import { Product } from './product.entity';
import { UserDevice } from './userdevice.entity';
import { AlarmValue } from './alarm_value.entity';

@Injectable()
export class DeviceService {
    constructor(
        @InjectRepository(Device)
        private readonly DeviceRepository: Repository<Device>,
        @InjectRepository(Product)
        private readonly ProductRepository: Repository<Product>,
        @InjectRepository(UserDevice)
        private readonly User_DeviceRepository: Repository<UserDevice>,
        @InjectRepository(AlarmValue)
        private readonly AlarmValueRepository: Repository<AlarmValue>,
    ) { }
    private readonly users: Device[] = [];
    private readonly products: Product[] = [];
    private readonly user_devices: UserDevice[] = [];

    // user's service
    async findAllProduct(): Promise<Product[]> {
      return await this.ProductRepository.find();
    }

    async addDevice(ocproduct_id:string, ocdevice_id: string,user_id:number): Promise<number> {
        var device: Device = await this.DeviceRepository.findOne({ocdevice_id:ocdevice_id, ocproduct_id:ocproduct_id}) 
        const user_device= new UserDevice();


        if((await this.User_DeviceRepository.find()).length == 0) {
          user_device.id=1;
        }

        if(device == null) {
            return 2 //设备不存在
        }
        if(await this.User_DeviceRepository.findOne({user_id:user_id,device_id:device.id}) !=null) {
            return 3 //用户已添加
        }
        user_device.user_id = user_id;
        user_device.device_id = device.id;

        await this.User_DeviceRepository.save(user_device);
        return 1;
    }

    async findDevice(ocdevice_id:string): Promise<Device> {
        return await this.DeviceRepository.findOne({ocdevice_id:ocdevice_id});
    }
    async findProduct(ocproduct_id:string): Promise<Product> {
        return await this.ProductRepository.findOne({ocproduct_id:ocproduct_id});
    }

    async findDeviceByDeviceId(device_id: number): Promise<Device> {
        return await this.DeviceRepository.findOne({id: device_id});
    }
    async findUserDeviceByDeviceId(device_id: number): Promise<UserDevice> {
        return await this.User_DeviceRepository.findOne({device_id: device_id});
    }
    ////////////????????????????????????????????????????????????????
    async findDeviceByUserId(user_id:number): Promise<Device[]> {//测试 ++ ✔✔
        var user_device:UserDevice[] = await this.User_DeviceRepository.find({user_id:user_id})
        
        const result = await this.DeviceRepository.createQueryBuilder('device')
            .leftJoinAndSelect(UserDevice,"user_device",'device.id = user_device.device_id')
            .where('user_device.user_id = :user_id',{user_id:user_id})
            .getMany()
        
        console.log(result)

        return result;
    }

    async deleteUserDevice(user_id:number, device_id:number): Promise<UserDevice> {
        var userdevice: UserDevice = await this.User_DeviceRepository.findOne({user_id:user_id,device_id:device_id}) 
        return await this.User_DeviceRepository.remove(userdevice);
    }

    async updateDevice(device_id:number, name: string, imei:string,imsi:string): Promise<Device> {
        var device: Device = await this.DeviceRepository.findOne({id:device_id}) 
        device.name = name
        device.imei = imei
        device.imsi = imsi
        return await this.DeviceRepository.save(device);
    }

      
    // admin's service
    async getAllDevice(): Promise<Device[]> {
        return await this.DeviceRepository.find();
    }
    async getProductById(product_id:number): Promise<Product> {
        return await this.ProductRepository.findOne({id:product_id});
    }










    //alarm value
    // // 加user_id吗
    async findAlarmValue(device_id: number, datatype_id: number, up_down:number): Promise<AlarmValue> {
        return await this.AlarmValueRepository.findOne({device_id:device_id, datatype_id:datatype_id,up_down:up_down});
    }
    async addAlarmValue(value:string,device_id: number, datatype_id: number, up_down: number, user_id:number, send_mail:number,send_sms:number,send_message:number): Promise<AlarmValue> {
        var alarm_value: AlarmValue = await this.AlarmValueRepository.findOne({device_id:device_id, datatype_id:datatype_id, up_down:up_down}) 
        if (alarm_value == null) {
            const new_alarm_value = new AlarmValue()
            if((await this.AlarmValueRepository.find()).length == 0) {
                new_alarm_value.id=1;
            }
            new_alarm_value.value = value
            new_alarm_value.device_id = device_id;
            new_alarm_value.datatype_id = datatype_id;
            new_alarm_value.user_id = 1;
            new_alarm_value.up_down = up_down;
            new_alarm_value.send_mail = send_mail;
            new_alarm_value.send_sms = send_sms;
            new_alarm_value.send_message_in_website = send_message;
            return await this.AlarmValueRepository.save(new_alarm_value);
        }
        else {
            alarm_value.value = value
            alarm_value.device_id = device_id;
            alarm_value.datatype_id = datatype_id;
            alarm_value.user_id = 1;
            alarm_value.up_down = up_down;
            alarm_value.send_mail = send_mail;
            alarm_value.send_sms = send_sms;
            alarm_value.send_message_in_website = send_message;
            return await this.AlarmValueRepository.save(alarm_value);
        }
    }

}
