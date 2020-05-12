import { Controller, Get, Post, HttpStatus, Res, Param, Body, NotFoundException,Req,Request,Header, UseInterceptors, UploadedFile } from '@nestjs/common';
import { FileInterceptor,FilesInterceptor } from '@nestjs/platform-express';
import { createWriteStream } from 'fs';
import { join } from 'path';
const fs = require('fs');

@Controller('article')
export class ArticleController {

    @Get('/a')
    async findAll(@Res() res): Promise<string> {
        
        const dirCache = {};
        var user_id = 1;
        var dir = join(__dirname, '..','../public/upload', '/', user_id.toString())
        fs.mkdirSync(dir);
        console.log(fs.existsSync(dir))

        return res.status(HttpStatus.OK).json({msg:"success",tip:"成功"});
    }

    @Post('upload')
    @UseInterceptors(FileInterceptor('file'))
    async uploadFile(@Res() res, @UploadedFile() file): Promise<string> {
        console.log(file);
        var user_id = 1;
        var dir = join(__dirname, '..','../public/upload', '/', user_id.toString())
        if(fs.existsSync(dir) == false) {
            fs.mkdirSync(dir);
            console.log(fs.existsSync(join(__dirname, '..','../public/upload', '/', user_id.toString())))
        }

        const writeImage = createWriteStream(join(__dirname, '..','../public/upload/', user_id.toString(), `${file.originalname}`))
        writeImage.write(file.buffer)

        return res.status(HttpStatus.OK).json({msg:"success",tip:"成功"});
    }

}
