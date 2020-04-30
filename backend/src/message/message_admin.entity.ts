// message/message_admin.entity.ts
import { Column, Entity, PrimaryGeneratedColumn, BaseEntity } from 'typeorm';

// 这里可以修改表名
@Entity('message_admin')
export class MessageAdmin extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('int')
  admin_id: number;

  @Column('varchar')
  content: string;

  @Column('datetime', {nullable: true,default: () => 'CURRENT_TIMESTAMP'})
  time: string;

}