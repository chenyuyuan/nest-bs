import { Test, TestingModule } from '@nestjs/testing';
import { DeviceController } from './device.controller';
import { DeviceService } from './device.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Device } from './device.entity';
import { Product } from './product.entity';
import { UserDevice } from './userdevice.entity';

describe('Device Controller', () => {
  let controller: DeviceController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [TypeOrmModule.forRoot(), TypeOrmModule.forFeature([Device,Product,UserDevice]), ],
      providers: [DeviceService],
      controllers: [DeviceController]
    })
    .overrideProvider(DeviceService)
    .useValue(DeviceService)
    .compile();

    controller = module.get<DeviceController>(DeviceController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
