import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Data } from './entity/data.entity';
import { Repository } from 'typeorm';
import { DataType } from './entity/datatype.entity';
import { DeviceDatatype } from './entity/devicedatatype.entity';

@Injectable()
export class DataService {
    constructor(
        @InjectRepository(Data)
        private readonly DataRepository: Repository<Data>,
        @InjectRepository(DataType)
        private readonly DataTypeRepository: Repository<DataType>,
        @InjectRepository(DeviceDatatype)
        private readonly DeviceDatatypeRepository: Repository<DeviceDatatype>,
      ) { }
    
    private readonly datas: Data[] = [];
    private readonly datatypes: DataType[] = [];
    private readonly devicedatatypes: DeviceDatatype[] = [];

    async getDataNew(device_id:number, datatype_id: number): Promise<Data> {
        //var data: Data = await this.DataRepository.findOne({device_id:device_id, datatype_id:datatype_id}) 
        var data:Data = await this.DataRepository.createQueryBuilder("data").where("device_id=\':device_id\' and datatype_id='\:datatype_id\'",{device_id,datatype_id})
            .orderBy("id","DESC").getOne()
        //console.log("getDataNew")
        //console.log(data)
        return data;
    }

    async getAllData(): Promise<Data[]> {
        //var data: Data = await this.DataRepository.findOne({device_id:device_id, datatype_id:datatype_id}) 
        var alldata:Data[] = await this.DataRepository.find()
        //console.log(alldata)
        return alldata;
    }



}
