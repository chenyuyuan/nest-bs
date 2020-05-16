import { Module } from '@nestjs/common';
import { DataService } from './data.service';
import { DataController } from './data.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DeviceDatatype } from './entity/devicedatatype.entity';
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
    TypeOrmModule.forFeature([Data, DataType,DeviceDatatype , Device,Product,UserDevice,AlarmValue]), 
    RedisModule.register({host:'101.132.105.38',port:6379,password:'',db:1})
  ],

  providers: [DataService, DeviceService, CacheService],
  controllers: [DataController]
})
export class DataModule {}
