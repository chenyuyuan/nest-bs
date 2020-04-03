import { Controller, Get, Post, HttpStatus, Res, Param, Body, NotFoundException } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.entity';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Get('/all')
  findAll(): Promise<User[]> {
    console.log("[user/all]: got data~~~~~~");
    return this.userService.findAll();
  }
  @Post('/login') 
  async login(@Res() res, @Body() name: string, @Body() pwd:string) {
    const post = await this.userService.getUserById(name);
    if (!post) throw new NotFoundException('Post does not exist!');
    return res.status(HttpStatus.OK).json(post);
  }
}