import { Module } from '@nestjs/common';
import { DeviceService } from './device.service';
import { DeviceController } from './device.controller';

import { TypeOrmModule } from '@nestjs/typeorm';
import { Device } from './device.entity';
import { Product } from './product.entity';
import { UserDevice } from './userdevice.entity';
import { AlarmValue } from './alarm_value.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Device,Product,UserDevice,AlarmValue]), ],
  providers: [DeviceService],
  controllers: [DeviceController]
})
export class DeviceModule {}
