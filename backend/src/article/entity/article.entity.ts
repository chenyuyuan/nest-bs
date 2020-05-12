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
  
    @Column('int',{nullable:true})
    like: number;
  
    @Column('int',{nullable:true})
    dislike: number;
  
    @Column('int',{nullable:true})
    comment: number;
  
    @Column('int',{nullable:true})
    user_type: number;

    @Column('datetime', {nullable: true,default: () => 'CURRENT_TIMESTAMP'})
    time: string;
  
    @Column('int',{nullable:true})
    verify_code: number;

}