// user/user.entity.ts
import { Column, Entity, PrimaryGeneratedColumn, BaseEntity } from 'typeorm';

// 这里可以修改表名
// @Entity('messages')
@Entity()
export class Product extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar',{nullable: true})
  name: string;

  @Column('varchar',{nullable: true})
  ocproduct_id: string;

  @Column('varchar',{nullable: true})
  device_type: string;

  @Column('varchar',{nullable: true})
  protocol_type: string;

}