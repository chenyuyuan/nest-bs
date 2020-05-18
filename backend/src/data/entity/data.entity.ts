// user/user.entity.ts
import { Column, Entity, PrimaryGeneratedColumn, BaseEntity } from 'typeorm';

// 这里可以修改表名
// @Entity('messages')
@Entity()
export class Data extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('int')
  value: number;

  @Column('int',{nullable:true})
  datatype_id: number;

  @Column('int',{nullable:true})
  device_id: number;

  @Column('datetime',{nullable:true, default:() => 'CURRENT_TIMESTAMP'})
  time: string;
  


}