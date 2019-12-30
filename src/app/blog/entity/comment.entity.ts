import { Column, CreateDateColumn, Entity, Generated, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn, VersionColumn } from 'typeorm';
import { PostEntity } from './post.entity';
import { Type } from 'class-transformer';

@Entity()
export class CommentEntity {

	@PrimaryGeneratedColumn()
	public id: string;

	@Column()
	@Generated('uuid')
	public uuid: string;

	@Column()
	public content: string;

	@ManyToOne(type => PostEntity, post => post.comments)
	@Type(() => PostEntity)
	public post: PostEntity;

	@CreateDateColumn()
	public createdAt: Date;

	@UpdateDateColumn()
	public updatedAt: Date;

	@VersionColumn()
	public version: number;
}
