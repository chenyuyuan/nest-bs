// user/user.entity.ts
import { Column, Entity, PrimaryGeneratedColumn, BaseEntity } from 'typeorm';

// 这里可以修改表名
// @Entity('messages')
@Entity()
export class User_Device extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('int')
  user_id: number;

  @Column('varchar')
  device_id: number;

  @Column('int')
  verify: number;

}