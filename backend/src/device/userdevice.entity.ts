// user/user.entity.ts
import { Column, Entity, PrimaryGeneratedColumn, BaseEntity } from 'typeorm';

// 这里可以修改表名
// @Entity('messages')
@Entity()
export class UserDevice extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('int',{nullable: true})
  user_id: number;

  @Column('int',{nullable: true})
  device_id: number;

  @Column('int',{nullable: true,default:0})
  verify: number;

}