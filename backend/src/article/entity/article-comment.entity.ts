// user/user.entity.ts
import { Column, Entity, PrimaryGeneratedColumn, BaseEntity } from 'typeorm';

// 这里可以修改表名
// @Entity('messages')
@Entity("article_comment")
export class ArticleComment extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('int')
  user_id: number;

  @Column('int')
  article_id: number;

  @Column('int', {default:0})
  to_user_id: number;

  @Column('varchar',{nullable:true})
  content: string;

  @Column('datetime', {nullable: true,default: () => 'CURRENT_TIMESTAMP'})
  time: string;

}