import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as serveStatic from 'serve-static';
import path = require('path');
import * as session from 'express-session';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create( AppModule);

  app.enableCors( {
      "origin": "http://localhost:8080",
      "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
      "preflightContinue": false,
      "optionsSuccessStatus": 204,
      "credentials":true
  }); //允许跨域访问***********************

  // 使用serve-static
  // '/public' 是路由名称，即你访问的路径为：host/public
  // serveStatic 为 serve-static 导入的中间件，其中'../public' 为本项目相对于src目录的绝对地址
  app.use('/public', serveStatic(path.join(__dirname, '../public'), {
    maxAge: '1d',
    extensions: ['jpg', 'jpeg', 'png', 'gif'],
   }));

  app.use(session({ secret: 'keyword', cookie: { maxAge: 60000 }}))

  const options = new DocumentBuilder()
    .setTitle('Nodejs + Vuejs 全栈项目-后台管理API')
    .setDescription('供后台管理界面调用的服务端API')
    .setVersion('1.0')
    // .addTag('cats')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api-docs', app, document);


  
  await app.listen(3000);

}
bootstrap();