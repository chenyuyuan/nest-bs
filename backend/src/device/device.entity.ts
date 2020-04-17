// user/user.entity.ts
import { Column, Entity, PrimaryGeneratedColumn, BaseEntity } from 'typeorm';

// 这里可以修改表名
// @Entity('messages')
@Entity()
export class Device extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar')
  name: string;

  @Column('varchar')
  ocdevice_id: string;

  @Column('varchar')
  ocproduct_id: string;

  @Column('varchar')
  imei: string;

  @Column('varchar')
  imsi: string;

  @Column('datetime')
  reg_time: string;

  @Column('int')
  status: number;

}