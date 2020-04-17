import { Injectable } from '@nestjs/common';
// ORM
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Device } from './device.entity';
import { Product } from './product.entity';
import { User_Device } from './user_device.entity';

@Injectable()
export class DeviceService {
    constructor(
        @InjectRepository(Device)
        private readonly DeviceRepository: Repository<Device>,
        @InjectRepository(Product)
        private readonly ProductRepository: Repository<Product>,
        @InjectRepository(User_Device)
        private readonly User_DeviceRepository: Repository<User_Device>,
    ) { }
    private readonly users: Device[] = [];
    private readonly products: Product[] = [];
    private readonly user_device: User_Device[] = [];

    // user's service
    async findAllProduct(): Promise<Product[]> {
      return await this.ProductRepository.find();
    }

    async updatePwd(ocproduct_id:string, ocdevice_id: string,user_id:number): Promise<User_Device> {
        var device: Device = await this.DeviceRepository.findOne({ocdevice_id:ocdevice_id, ocproduct_id:ocproduct_id}) 
        var user_device:User_Device
        if((await this.User_DeviceRepository.find()).length == 0) {
            user_device.id=1;
          }
        user_device.user_id = user_id;
        user_device.user_id = device.id;

        return await this.User_DeviceRepository.save(user_device);
    }

    async findDevice(ocdevice_id:string): Promise<Device> {
        return await this.DeviceRepository.findOne({ocdevice_id:ocdevice_id});
    }
    async findProduct(ocproduct_id:string): Promise<Product> {
        return await this.ProductRepository.findOne({ocproduct_id:ocproduct_id});
    }

    async findDeviceByUserId(user_id:number): Promise<Device[]> {//测试 ++
        var user_device:User_Device[] = await this.User_DeviceRepository.find({user_id:user_id})
        
        const result = await this.DeviceRepository.createQueryBuilder('device')
            .leftJoinAndSelect(User_Device,"user_device",'device.id = user_device.device_id and user_device.user_id = :user_id',{user_id}).getMany()
        
        console.log(result)

        return result;
    }

    async deleteUserDevice(user_id:number, device_id:number): Promise<User_Device> {
        var user_device: User_Device = await this.User_DeviceRepository.findOne({user_id:user_id,device_id:device_id}) 
        return await this.User_DeviceRepository.remove(user_device);
    }

    async updateDevice(device_id:number, name: string, imei:string,imsi:string): Promise<Device> {
        var device: Device = await this.DeviceRepository.findOne({id:device_id}) 
        device.name = name
        device.imei = imei
        device.imsi = imsi
        return await this.DeviceRepository.save(device);
      }
    



    // admin's service


    
}
