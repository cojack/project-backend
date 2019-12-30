import { Column, CreateDateColumn, Entity, Generated, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn, VersionColumn } from 'typeorm';
import { CommentEntity } from './comment.entity';
import { Type } from 'class-transformer';

@Entity()
export class PostEntity {

	@PrimaryGeneratedColumn()
	public id: string;

	@Column()
	@Generated('uuid')
	public uuid: string;

	@Column({
		nullable: false
	})
	public title: string;

	@Column({
		nullable: false
	})
	public body: string;

	@Column({
		nullable: false,
		array: true
	})
	public tags: string;

	@OneToMany(type => CommentEntity, comment => comment.post)
	@Type(() => CommentEntity)
	public comments: CommentEntity[];

	@CreateDateColumn()
	public createdAt: Date;

	@UpdateDateColumn()
	public updatedAt: Date;

	@VersionColumn()
	public version: number;
}
