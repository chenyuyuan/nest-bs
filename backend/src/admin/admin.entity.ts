// user/user.entity.ts
import { Column, Entity, PrimaryGeneratedColumn, BaseEntity } from 'typeorm';

// 这里可以修改表名
// @Entity('messages')
@Entity('admin')
export class Admin extends BaseEntity {
  @PrimaryGeneratedColumn()
  admin_id: number;

  @Column('varchar')
  name: string;

  @Column('varchar',{nullable:true})
  pwd: string;


}