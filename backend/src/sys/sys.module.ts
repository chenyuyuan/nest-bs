import { Module } from '@nestjs/common';
import { SysController } from './sys.controller';
import { SysService } from './sys.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SysVar } from './entity/sysvar.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SysVar]), ],
  controllers: [SysController],
  providers: [SysService]
})
export class SysModule {}
