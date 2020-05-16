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


@Module({
  imports: [
    TypeOrmModule.forFeature([Data, DataType,DeviceDatatype]), 
    RedisModule.register({host:'101.132.105.38',port:6379,password:'',db:1})
  ],

  providers: [DataService,CacheService],
  controllers: [DataController]
})
export class DataModule {}
