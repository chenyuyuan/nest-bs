import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Admin } from './admin.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AdminService {
    constructor(
        @InjectRepository(Admin)
        private readonly AdminRepository: Repository<Admin>,
      ) { }
      private readonly admins: Admin[] = [];

    async findById(name:string): Promise<Admin> {
        return await this.AdminRepository.findOne({name:name});
        
    }

}
