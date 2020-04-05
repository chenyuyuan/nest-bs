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

  @Column('varchar')
  mail: string;

  @Column('varchar')
  pwd: string;

  @Column('varchar')
  phone: string;

}