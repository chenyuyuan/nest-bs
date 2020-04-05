import { Injectable } from '@nestjs/common';
// ORM
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly UserRepository: Repository<User>,
  ) { }

  private readonly users: User[] = [];


  async addUser(name:string, mail:string, pwd:string, phone:string): Promise<User> {
    const user = new User();
    if((await this.UserRepository.find()).length == 0) {
      user.user_id=1;
    }
    user.mail = mail;
    user.name = name;
    user.pwd = pwd;
    user.phone = phone;
    return await user.save();//save会返回保存后的对象，包含了自动生成id，insert返回undefined
    // save保存之后，原实体对象上会出现自动生成id，insert插入之后原实体对象不变
    // 这一步为了突出save对实体的改变，使用了自动生成id，如果id不是自动生成，那么只有返回值有区别
  }

  async updatePwd(mail:string, pwd: string): Promise<User> {
    var user: User = await this.UserRepository.findOne({mail:mail}) 
    user.pwd = pwd
    return await this.UserRepository.save(user);
  }


  async findAll(): Promise<User[]> {
    return await this.UserRepository.find();
  }

  async findById(): Promise<User[]> {
    return await this.UserRepository.find();
  }

  async getUserByName(name: string): Promise<User> {
    return await this.UserRepository.findOne({name:name});
  }


}