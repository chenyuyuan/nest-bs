import { Test, TestingModule } from '@nestjs/testing';
import { BlogController } from './blog.controller';
import { BlogService } from './blog.service';
import { MongooseModule } from '@nestjs/mongoose';
import { BlogSchema } from './schemas/blog.schema';

describe('Blog Controller', () => {
  let controller: BlogController;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        MongooseModule.forFeature([{ name: 'Post', schema: BlogSchema }])
     ],
      controllers: [BlogController],
      providers: [ BlogService]
    })
    .overrideProvider(BlogService)
    .useValue(BlogService)
    .compile();

    controller = module.get<BlogController>(BlogController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
