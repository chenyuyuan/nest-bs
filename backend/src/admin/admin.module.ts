import { Module } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { Admin } from './admin.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DeviceService } from 'src/device/device.service';
import { Device } from 'src/device/device.entity';
import { Product } from 'src/device/product.entity';
import { UserDevice } from 'src/device/userdevice.entity';
import { AlarmValue } from 'src/device/alarm_value.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Admin, Device,Product,UserDevice,AlarmValue,]), ],
  controllers: [AdminController],
  providers: [AdminService,DeviceService]
})
export class AdminModule {}
