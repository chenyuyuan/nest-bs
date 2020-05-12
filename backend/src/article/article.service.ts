import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Article } from './entity/article.entity';
import { ArticleComment } from './entity/article-comment.entity';

@Injectable()
export class ArticleService {
    constructor(
        @InjectRepository(Article)
        private readonly ArticleRepository: Repository<Article>,
        @InjectRepository(ArticleComment)
        private readonly ArticleCommentRepository: Repository<ArticleComment>,
      ) { }

    async addArticle(user_id:number, title:string, content:string,img:string, verify_code:number): Promise<Article> {
        const article = new Article();
        if((await this.ArticleRepository.find()).length == 0) {
            article.id=1;
        }
        article.author_id = user_id;
        article.title = title;
        article.content = content;
        article.img = img;
        article.verify_code = verify_code;
        return await article.save();
    }
    async addArticleComment(user_id:number, article_id:number, to_user_id:number, content:string): Promise<ArticleComment> {
        const articleComment = new ArticleComment();
        if((await this.ArticleRepository.find()).length == 0) {
            articleComment.id=1;
        }
        articleComment.user_id = user_id;
        articleComment.article_id = article_id;
        articleComment.to_user_id = to_user_id;
        articleComment.content = content;

        var article: Article = await this.ArticleRepository.findOne({id: article_id}) 
        article.comment = article.comment + 1;
        await this.ArticleRepository.save(article);

        return await articleComment.save();
    }


    async updateArticle(article_id:number, user_id:number, title:string, content:string,img:string, verify_code:number): Promise<Article> {
        var article: Article = await this.ArticleRepository.findOne({id: article_id, author_id:user_id}) 
        article.title = title;
        article.content = content;
        article.img = img;
        article.verify_code = verify_code;
        return await this.ArticleRepository.save(article);
    }
    async updateArticleLike(article_id:number,like:number): Promise<Article> {
        var article: Article = await this.ArticleRepository.findOne({id: article_id})
        if(like == 0) {
            article.like = article.like - 1;
        }
        else if(like == 1) {
            article.like = article.like + 1;
        }
        return await this.ArticleRepository.save(article);
    }


    async deleteArticle(user_id:number, article_id:number): Promise<Article> {
        var article: Article = await this.ArticleRepository.findOne({id:article_id, author_id:user_id}) 
        return await this.ArticleRepository.remove(article);
    }
    async deleteArticleComment(user_id:number, articleComment_id:number): Promise<ArticleComment> {
        var articleComment: ArticleComment = await this.ArticleCommentRepository.findOne({id: articleComment_id, user_id: user_id});

        var article: Article = await this.ArticleRepository.findOne({id: articleComment.article_id}) 
        article.comment = article.comment - 1;
        await this.ArticleRepository.save(article);

        return await this.ArticleCommentRepository.remove(articleComment);
    }


    async getArticlesByVerifycode(verify_code:number): Promise<Article[]> {
        return await this.ArticleRepository.find({verify_code: verify_code});
    }
    async getArticlesMy(user_id: number): Promise<Article[]> {
        return await this.ArticleRepository.find({author_id: user_id});
    }
    async getArticle(article_id: number): Promise<Article> {
        return await this.ArticleRepository.findOne({id: article_id});
    }
    async getArticleMy(article_id: number, user_id: number): Promise<Article> {
        return await this.ArticleRepository.findOne({id: article_id, author_id: user_id});
    }
    async getComments(article_id: number): Promise<ArticleComment[]> {
        return await this.ArticleCommentRepository.find({article_id: article_id});
    }

}
