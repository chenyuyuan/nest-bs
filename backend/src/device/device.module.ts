import { Module } from '@nestjs/common';
import { DeviceService } from './device.service';
import { DeviceController } from './device.controller';

import { TypeOrmModule } from '@nestjs/typeorm';
import { Device } from './device.entity';
import { Product } from './product.entity';
import { UserDevice } from './userdevice.entity';
import { AlarmValue } from './alarm_value.entity';
import { DataService } from 'src/data/data.service';
import { ProductDatatype } from 'src/data/entity/productdatatype.entity';
import { DataType } from 'src/data/entity/datatype.entity';
import { Data } from 'src/data/entity/data.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Device,Product,UserDevice,AlarmValue,  Data, DataType, ProductDatatype]), ],
  providers: [DeviceService],
  controllers: [DeviceController, DataService]
})
export class DeviceModule {}
