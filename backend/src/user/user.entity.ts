// user/user.entity.ts
import { Column, Entity, PrimaryGeneratedColumn, BaseEntity } from 'typeorm';

// 这里可以修改表名
// @Entity('messages')
@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  user_id: number;

  @Column('varchar')
  name: string;

  @Column('varchar',{nullable:true})
  mail: string;

  @Column('varchar',{nullable:true})
  pwd: string;

  @Column('varchar',{nullable:true})
  phone: string;

}