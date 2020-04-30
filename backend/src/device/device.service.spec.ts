import { Test, TestingModule } from '@nestjs/testing';
import { DeviceService } from './device.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Device } from './device.entity';
import { Product } from './product.entity';
import { UserDevice } from './userdevice.entity';
import { DeviceController } from './device.controller';

describe('DeviceService', () => {
  let service: DeviceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [TypeOrmModule.forFeature([Device,Product,UserDevice]), ],
      providers: [DeviceService],
      controllers: [DeviceController]
    })
    .overrideProvider(DeviceService)
    .useValue(DeviceService)
    .compile();

    service = module.get<DeviceService>(DeviceService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
