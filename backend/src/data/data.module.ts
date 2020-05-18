import { Module } from '@nestjs/common';
import { DataService } from './data.service';
import { DataController } from './data.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductDatatype } from './entity/productdatatype.entity';
import { DataType } from './entity/datatype.entity';
import { Data } from './entity/data.entity';
import { SysService } from 'src/sys/sys.service';
import { SysVar } from 'src/sys/entity/sysvar.entity';
import { CacheService } from 'src/cache/cache.service';
import { RedisModule } from 'nestjs-redis';
import { Device } from 'src/device/device.entity';
import { Product } from 'src/device/product.entity';
import { UserDevice } from 'src/device/userdevice.entity';
import { AlarmValue } from 'src/device/alarm_value.entity';
import { DeviceService } from 'src/device/device.service';


@Module({
  imports: [
    TypeOrmModule.forFeature([Data, DataType, ProductDatatype , Device,Product,UserDevice,AlarmValue]), 
    RedisModule.register({host:'106.54.90.108',port:6379,password:'',db:3})
  ],

  providers: [DataService, DeviceService, CacheService],
  controllers: [DataController]
})
export class DataModule {}
