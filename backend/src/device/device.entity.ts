// user/user.entity.ts
import { Column, Entity, PrimaryGeneratedColumn, BaseEntity } from 'typeorm';

// 这里可以修改表名
// @Entity('messages')
@Entity()
export class Device extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar',{nullable: true})
  name: string;

  @Column('varchar',{nullable: true})
  ocdevice_id: string;

  @Column('varchar',{nullable: true})
  ocproduct_id: string;

  @Column('varchar',{nullable: true})
  imei: string;

  @Column('varchar',{nullable: true})
  imsi: string;

  @Column('datetime',{nullable: true})
  reg_time: string;

  @Column('int',{nullable: true})
  status: number;

}