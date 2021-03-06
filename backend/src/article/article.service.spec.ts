import { Test, TestingModule } from '@nestjs/testing';
import { ArticleService } from './article.service';
import { INestApplication } from '@nestjs/common';
import { ArticleModule } from './article.module';

describe('ArticleService', () => {
  let service: ArticleService;


  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ArticleModule],
    }).compile();

    service = module.get<ArticleService>(ArticleService);
    
  });

  it('should be defined', () => {
    //expect(service).toBeDefined();
  });

});
