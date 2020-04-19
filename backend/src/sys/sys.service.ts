import { Injectable } from '@nestjs/common';
import { SysVar } from './entity/sysvar.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class SysService {
    constructor(
        @InjectRepository(SysVar)
        private readonly SysVarRepository: Repository<SysVar>,
      ) { }
      private readonly sysvars: SysVar[] = [];
    
        async getSysVarName(name: string): Promise<string> {
            var sysvar  = new SysVar();
            console.log("getSysVarName")
            sysvar = await this.SysVarRepository.findOne({name:name})
            if(sysvar == null) 
                return null;
            console.log(sysvar.value)
            return sysvar.value;
        }
}
