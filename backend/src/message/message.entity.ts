// message/message.entity.ts
import { Column, Entity, PrimaryGeneratedColumn, BaseEntity } from 'typeorm';

// 这里可以修改表名
@Entity('message')
export class Message extends BaseEntity {
  @PrimaryGeneratedColumn() id: number;

  @Column('int')
  user_id: number;

  @Column('int')
  sender_id: number;

  @Column('varchar')
  content: string;

  @Column('datetime', {nullable:true,default:() => 'CURRENT_TIMESTAMP'})
  time: string;

}