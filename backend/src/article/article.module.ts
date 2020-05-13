import { Module } from '@nestjs/common';
import { ArticleController } from './article.controller';
import { ArticleService } from './article.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RedisModule } from 'nestjs-redis';
import { Article } from './entity/article.entity';
import { ArticleComment } from './entity/article-comment.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Article, ArticleComment]), 
    RedisModule.register({host:'101.132.105.38',port:6379,password:'',db:1})
  ],
  controllers: [ArticleController],
  providers: [ArticleService]
})
export class ArticleModule {}
