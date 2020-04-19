import { Module } from '@nestjs/common';
import { DataService } from './data.service';
import { DataController } from './data.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DeviceDatatype } from './entity/devicedatatype.entity';
import { DataType } from './entity/datatype.entity';
import { Data } from './entity/data.entity';
import { SysService } from 'src/sys/sys.service';
import { SysVar } from 'src/sys/entity/sysvar.entity';


@Module({
  imports: [TypeOrmModule.forFeature([Data, DataType,DeviceDatatype,SysVar]), ],

  providers: [DataService,SysService],
  controllers: [DataController]
})
export class DataModule {}
