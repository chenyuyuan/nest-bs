// user/user.entity.ts
import { Column, Entity, PrimaryGeneratedColumn, BaseEntity } from 'typeorm';

// 这里可以修改表名
// @Entity('messages')
@Entity()
export class Product extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar')
  name: string;

  @Column('varchar')
  ocproduct_id: string;

  @Column('varchar')
  device_type: string;

  @Column('varchar')
  protocol_type: string;

}