// user/user.entity.ts
import { Column, Entity, PrimaryGeneratedColumn, BaseEntity } from 'typeorm';

// 这里可以修改表名
// @Entity('messages')
@Entity("alarm_value")
export class AlarmValue extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar',{nullable: true})
  name: string;

  //浮点型吧
  @Column('varchar',{nullable: true})
  value: string;

  @Column('int',{nullable: true})
  up_down: number;

  @Column('int',{nullable: true})
  device_id: number;

  @Column('int',{nullable: true})
  datatype_id: number;

  @Column('int',{nullable: true})
  user_id: number;

  @Column('int',{nullable: true})
  send_mail: number;

  @Column('int',{nullable: true})
  send_sms: number;

  @Column('int',{nullable: true})
  send_message_in_website: number;

}