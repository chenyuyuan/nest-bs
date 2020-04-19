import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { MongooseModule } from '@nestjs/mongoose';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BlogModule } from './blog/blog.module';
import { UserModule } from './user/user.module';
import { DeviceModule } from './device/device.module';
import { DataModule } from './data/data.module';
import { SysModule } from './sys/sys.module';


@Module({
  imports: [
    MongooseModule.forRoot('mongodb://101.132.105.38/bs', { useNewUrlParser: true }),
    BlogModule, UserModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: '101.132.105.38',
      port: 3306,
      username: 'root',
      password: 'Aaa1111.',
      database: 'health_center',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    DeviceModule,
    DataModule,
    SysModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}