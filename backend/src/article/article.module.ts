import { Module } from '@nestjs/common';
import { ArticleController } from './article.controller';
import { ArticleService } from './article.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RedisModule } from 'nestjs-redis';
import { Article } from './entity/article.entity';
import { ArticleComment } from './entity/article-comment.entity';
import { CacheService } from 'src/cache/cache.service';
import { UserService } from 'src/user/user.service';
import { User } from 'src/user/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Article, ArticleComment,  User]), 
    RedisModule.register({host:'106.54.90.108',port:6379,password:'',db:1})
  ],
  controllers: [ArticleController],
  providers: [ArticleService, CacheService, UserService]
})
export class ArticleModule {}
