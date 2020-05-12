// user/user.entity.ts
import { Column, Entity, PrimaryGeneratedColumn, BaseEntity } from 'typeorm';

// 这里可以修改表名
// @Entity('messages')
@Entity("article")
export class Article extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column('int')
    author_id: number;

    @Column('varchar',{nullable:true})
    title: string;
  
    @Column('varchar',{nullable:true})
    content: string;

    @Column('varchar',{nullable:true})
    img: string;
  
    @Column('int',{nullable:true, default:0})
    like: number;
  
    @Column('int',{nullable:true, default:0})
    comment: number;
  
    @Column('int',{nullable:true, default:0})
    user_type: number;

    @Column('datetime', {nullable: true,default: () => 'CURRENT_TIMESTAMP'})
    time: string;
  
    @Column('int',{nullable:true})
    verify_code: number;

}