import { Controller, Get, Post, HttpStatus, Res, Param, Body, NotFoundException,Req,Request,Header, UseInterceptors, UploadedFile } from '@nestjs/common';
import { FileInterceptor,FilesInterceptor } from '@nestjs/platform-express';
import { createWriteStream } from 'fs';
import { join } from 'path';
import { ArticleService } from './article.service';
import { CacheService } from 'src/cache/cache.service';
import { AddArticleDTO } from './dto/add-article.dto';
import { UpdateArticleDTO } from './dto/update-article.dto';
import { AddArticleCommentDTO } from './dto/add-comment.dto';
import { UserService } from 'src/user/user.service';
const fs = require('fs');

@Controller('article')
export class ArticleController {
    constructor(private readonly articleService: ArticleService, private readonly cacheService: CacheService, private readonly userService:UserService) { }


    @Get('/a')
    async findAll(@Res() res, @Request() request): Promise<string> {
        var user_id = request.session.user_id;
        console.log(user_id)

        await this.articleService.delete(1, 4);

        return res.status(HttpStatus.OK).json({msg:"success", tip:"成功", user_id:user_id});
    }

    @Post('/add') 
    async addArticle(@Res() res, @Request() request, @Body() addArticleDTO:AddArticleDTO) { // correct
        var user_id = request.session.user_id;
        user_id = 1;
        var article = await this.articleService.addArticle(user_id, addArticleDTO.title, addArticleDTO.content, addArticleDTO.img, addArticleDTO.verify_code);
        if (article != null) {
            return res.status(HttpStatus.OK).json({msg:"add_article_success",tip:"添加文章成功"});
        }
        return res.status(HttpStatus.OK).json({msg:"add_article_failed",tip:"添加文章失败"});
      
    }
    @Post('/addcomment') 
    async addArticleComment(@Res() res, @Request() request, @Body() addArticleCommentDTO:AddArticleCommentDTO) { // correct
        var user_id = request.session.user_id;
        user_id = 1;
        var articleComment = await this.articleService.addArticleComment(user_id, addArticleCommentDTO.article_id, addArticleCommentDTO.to_user_id, addArticleCommentDTO.content);
        if(articleComment != null){
            return res.status(HttpStatus.OK).json({msg:"add_comment_success",tip:"添加评论成功"});
        }
        return res.status(HttpStatus.OK).json({msg:"add_comment_failed",tip:"添加评论失败"});
      
    }
    @Post('/update') 
    async updateArticle(@Res() res, @Request() request, @Body() updateArticleDTO:UpdateArticleDTO) { //correct
        var user_id = request.session.user_id;
        user_id = 1;
        var article = await this.articleService.updateArticle(
            updateArticleDTO.article_id, user_id, updateArticleDTO.title, updateArticleDTO.content, updateArticleDTO.img, updateArticleDTO.verify_code);
        if (article != null) {
            return res.status(HttpStatus.OK).json({msg:"update_article_success",tip:"修改文章成功"});
        }
        return res.status(HttpStatus.OK).json({msg:"add_article_failed",tip:"修改文章失败"});
    }


    @Get('/articlelist/:verify_code') 
    async getArticles(@Res() res, @Param() param, @Request() request) { // correct
        var user_id = request.session.user_id;
        user_id = 1;
        var articles = await this.articleService.getArticlesByVerifycode(param.verify_code);
        var articlesLen = articles.length;
        for (var i = 0;i<articlesLen;++i) {
            var likeRedis = (await this.cacheService.get(user_id) == 1)? 1:0;
            articles[i]["like"] = likeRedis;

            var user = await this.userService.findById(articles[i]['author_id'])
            if(user!=null) {
                articles[i]["name"] = user['name'];
            }
        }

        return res.status(HttpStatus.OK).json({msg:"get_article_success", tip:"获取文章成功",articles:articles});
    }
    @Get('/myarticlelist') 
    async getArticlesMy(@Res() res, @Param() param, @Request() request) { 
        var user_id = request.session.user_id;
        user_id = 1;
        var articles = await this.articleService.getArticlesMy(user_id);
        var articlesLen = articles.length;
        var name = request.session.username;

        for (var i = 0;i<articlesLen;++i) {
            var likeRedis = (await this.cacheService.get(user_id) == 1)? 1:0;
            articles[i]["like"] = likeRedis;
        }
        return res.status(HttpStatus.OK).json({msg:"get_article_success", tip:"获取文章成功",articles:articles, name: name});
    }
    @Get('/article/:article_id') 
    async getArticle(@Res() res, @Param() param, @Request() request) { 
        var user_id = request.session.user_id;
        user_id = 1;
        var article = await this.articleService.getArticle(param.article_id);
        var comments = await this.articleService.getComments(param.article_id);
        var likeRedis = (await this.cacheService.get(user_id) == 1)? 1:0;

        var name = (await this.userService.findById(article['author_id']))['name'];

        var commentsLen = comments.length;

        for (var i = 0;i<commentsLen;++i) {
            var user = await this.userService.findById(comments[i]['user_id'])
            if(user!=null) {
                comments[i]["username"] = user['name'];
            }
            var touser = await this.userService.findById(comments[i]['to_user_id']);
            if(touser!=null) {
                comments[i]["tousername"] = touser['name'];
            }
        }

        return res.status(HttpStatus.OK).json({msg:"get_article_success", tip:"获取文章成功", article:article, comments:comments, name: name});
    }
    @Get('/myarticle/:article_id') 
    async getArticleMy(@Res() res, @Param() param, @Request() request) {
        var user_id = request.session.user_id;
        user_id = 1;
        var article = await this.articleService.getArticleMy(param.article_id, user_id);
        var comments = await this.articleService.getComments(param.article_id);
        var likeRedis = (await this.cacheService.get(user_id) == 1)? 1:0;
        var user = await this.userService.findById(article['author_id'])
        var name = "";
        if(user!=null) {
            name = user['name']
        }
        return res.status(HttpStatus.OK).json({msg:"get_article_success", tip:"获取文章成功", article:article, comments:comments, like:likeRedis, name: name});
    }


    @Get('/del/:article_id') 
    async delArticle(@Res() res, @Param() param, @Request() request) { 
        var user_id = request.session.user_id;
        user_id = 1;
        var article = await this.articleService.deleteArticle(user_id, param.article_id);
        if (article != null) {
            return res.status(HttpStatus.OK).json({msg:"delete_article_success", tip:"删除文章成功"});
        }
        return res.status(HttpStatus.OK).json({msg:"delete_article_failed", tip:"删除文章失败"});
    }
    @Get('/delcomment/:comment_id') 
    async delComment(@Res() res, @Param() param, @Request() request) { 
        var user_id = request.session.user_id;
        user_id = 1;
        var article = await this.articleService.deleteArticleComment(user_id, param.comment_id);
        if (article != null) {
            return res.status(HttpStatus.OK).json({msg:"delete_comment_success", tip:"删除评论成功"});
        }
        return res.status(HttpStatus.OK).json({msg:"delete_comment_failed", tip:"删除评论失败"});
    }

    @Get('/like/:article_id') 
    async likeArticle(@Res() res, @Param() param, @Request() request) { 
        var user_id = request.session.user_id;
        user_id = 1;
        if(user_id != null) {
            var likeRedis = await this.cacheService.get(user_id)
            if (likeRedis == null || likeRedis == 0) {
                await this.articleService.updateArticleLike(param.article_id, 1)
                await this.cacheService.set(user_id, 1)
                return res.status(HttpStatus.OK).json({msg:"add_like_success", tip:"点赞成功"});
            }
            else {
                await this.articleService.updateArticleLike(param.article_id, 0)
                await this.cacheService.set(user_id, 0)
                return res.status(HttpStatus.OK).json({msg:"cancel_like_success", tip:"取消赞成功"});
            }
            
        }
        else {
            return res.status(HttpStatus.OK).json({msg:"without_login", tip:"请先登录"});
        }
    }

    @Get('/getmyuser_id') 
    async getmyuser_id(@Res() res, @Param() param, @Request() request) { 
        var user_id = request.session.user_id;
        user_id = 1;
        if(user_id != null) {
            return res.status(HttpStatus.OK).json({msg:"get_success", tip:"请先登录",user_id:user_id});
        }
        else {
            return res.status(HttpStatus.OK).json({msg:"without_login", tip:"请先登录"});
        }
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
