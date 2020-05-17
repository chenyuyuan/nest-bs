// user/user.entity.ts
import { Column, Entity, PrimaryGeneratedColumn, BaseEntity } from 'typeorm';

// 这里可以修改表名
// @Entity('messages')
@Entity("datatype")
export class DataType extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar',{nullable:true})
  name: string;

  @Column('varchar',{nullable:true})
  datatype: string;

  @Column('varchar',{nullable:true})
  operation: string;

  @Column('int',{nullable:true})
  operate_number: number;

  @Column('int',{nullable:true})
  order: number;

  @Column('varchar',{nullable:true})
  properties: string;
}