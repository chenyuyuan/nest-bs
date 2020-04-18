// user/user.entity.ts
import { Column, Entity,PrimaryColumn, PrimaryGeneratedColumn, BaseEntity } from 'typeorm';

// 这里可以修改表名
// @Entity('messages')
@Entity()
export class Sys_Mail_Code extends BaseEntity {

  @PrimaryColumn('varchar',)
  mail: string;

  @Column('varchar',{nullable: true})
  code: string;

}