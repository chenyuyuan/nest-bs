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
import { AdminModule } from './admin/admin.module';
import { ArticleModule } from './article/article.module';
import { MessageModule } from './message/message.module';
import { CacheModule } from './cache/cache.module';


@Module({
  imports: [
    //MongooseModule.forRoot('mongodb://localhost/bs', { useNewUrlParser: true }),
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
    AdminModule,
    ArticleModule,
    MessageModule,
    CacheModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}