// user/user.entity.ts
import { Column, Entity, PrimaryGeneratedColumn, BaseEntity } from 'typeorm';

// 这里可以修改表名
// @Entity('messages')
@Entity()
export class DeviceDatatype extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('int')
  device_id: number;

  @Column('int')
  datatype_id: number ;


}