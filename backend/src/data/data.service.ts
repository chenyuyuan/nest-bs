import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Data } from './entity/data.entity';
import { Repository } from 'typeorm';
import { DataType } from './entity/datatype.entity';
import { ProductDatatype } from './entity/productdatatype.entity';

@Injectable()
export class DataService {
    constructor(
        @InjectRepository(Data)
        private readonly DataRepository: Repository<Data>,
        @InjectRepository(DataType)
        private readonly DataTypeRepository: Repository<DataType>,
        @InjectRepository(ProductDatatype)
        private readonly ProductDatatypeRepository: Repository<ProductDatatype>,
      ) { }
    
    private readonly datas: Data[] = [];
    private readonly datatypes: DataType[] = [];
    private readonly productdatatypes: ProductDatatype[] = [];

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

    async getDataType(product_id: number): Promise<DataType> {
        var productDatatype = await this.ProductDatatypeRepository.findOne({product_id:product_id});
        var datatype = await this.DataTypeRepository.findOne({id: productDatatype['datatype_id']}) 
        return datatype;
    }




    async addData(value:number, device_id:number, datatype_id: number, time:string): Promise<Data> {
        const data = new Data();
        if((await this.DataRepository.find()).length == 0) {
            data.id=1;
        }
        data.value = value;
        data.device_id = device_id;
        data.datatype_id = datatype_id;
        data.time = time;
        return await data.save();
    }






}
