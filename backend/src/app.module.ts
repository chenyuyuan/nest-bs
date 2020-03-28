import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { MongooseModule } from '@nestjs/mongoose';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BlogModule } from './blog/blog.module';
import { UserModule } from './user/user.module';


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
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}