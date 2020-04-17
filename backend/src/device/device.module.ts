import { Module } from '@nestjs/common';
import { DeviceService } from './device.service';
import { DeviceController } from './device.controller';

import { TypeOrmModule } from '@nestjs/typeorm';
import { Device } from './device.entity';
import { Product } from './product.entity';
import { User_Device } from './user_device.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Device,Product,User_Device]), ],
  providers: [DeviceService],
  controllers: [DeviceController]
})
export class DeviceModule {}
