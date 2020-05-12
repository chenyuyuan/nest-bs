import { Controller, Get, Post, HttpStatus, Res, Param, Body, NotFoundException,Req,Request,Header, UseInterceptors, UploadedFile } from '@nestjs/common';
import { FileInterceptor,FilesInterceptor } from '@nestjs/platform-express';
import { createWriteStream } from 'fs';
import { join } from 'path';

@Controller('article')
export class ArticleController {

    @Get('/a')
    async findAll(@Res() res): Promise<string> {
        const fs = require('fs');
        const dirCache = {};
        var user_id = 1;
        var dir = join(__dirname, '..','../public/upload', '/', user_id)
        fs.mkdirSync(dir);
        console.log(fs.existsSync(join(__dirname, '..','../public/upload/1')))

        return res.status(HttpStatus.OK).json({msg:"success",tip:"成功"});
    }

    @Post('/upload0')
    @UseInterceptors(FileInterceptor('pic'))
    async upload(@UploadedFile() file,@Body() body){
        console.log(body); 
        console.log(file);     
        const writeImage = createWriteStream(join(__dirname, '..','../public/upload', `${file.originalname}`))
        writeImage.write(file.buffer)
        return '上传成功';
    }

    @Post('upload')
    @UseInterceptors(FileInterceptor('file'))
    uploadFile(@UploadedFile() file) {
        console.log(file);
        var user_id = 1;

        const writeImage = createWriteStream(join(__dirname, '..','../public/upload/1', `${file.originalname}`))
        writeImage.write(file.buffer)

    }

}
