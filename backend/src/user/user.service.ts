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


  async addUser(): Promise<User> {
    const user = new User();
    user.user_id = Math.round(Math.random() * 1000);
    user.name = 'yu';
    user.pwd = "1234"
    return await user.save();
  }

  async findAll(): Promise<User[]> {
    return await this.UserRepository.find();
  }

  async findById(): Promise<User[]> {
    return await this.UserRepository.find();
  }

  async getUserById(name: string): Promise<User> {
    return await this.UserRepository.findOne({name:"yuan"});
  }
}