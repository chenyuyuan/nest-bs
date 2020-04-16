import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as serveStatic from 'serve-static';
import path = require('path');
import * as session from 'express-session';

async function bootstrap() {
  const app = await NestFactory.create( AppModule);
  // 使用serve-static
  // '/public' 是路由名称，即你访问的路径为：host/public
  // serveStatic 为 serve-static 导入的中间件，其中'../public' 为本项目相对于src目录的绝对地址
  app.use('/public', serveStatic(path.join(__dirname, '../public'), {
    maxAge: '1d',
    extensions: ['jpg', 'jpeg', 'png', 'gif'],
   }));

  app.use(session({ secret: 'keyword', cookie: { maxAge: 60000 }}))


  app.enableCors(); //允许跨域访问
  await app.listen(3000);

//   const fs = require('fs');
//   const child_process = require('child_process');
//   for(var i=0; i<3; i++) {
//     var workerProcess = child_process.spawn('node', ['./src/getdata.ts', i]);
//     workerProcess.stdout.on('data', function (data) {
//        console.log('stdout: ' + data);
//     });
//     workerProcess.stderr.on('data', function (data) {
//        console.log('stderr: ' + data);
//     });
//     workerProcess.on('close', function (code) {
//        console.log('子进程已退出，退出码 '+code);
//     });
//  }


}
bootstrap();