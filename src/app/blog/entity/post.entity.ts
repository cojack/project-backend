import { Column, CreateDateColumn, Entity, Generated, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn, VersionColumn } from 'typeorm';
import { CommentEntity } from './comment.entity';
import { Type } from 'class-transformer';
import { UserEntity } from '../../user/entity';
import { CoreEntity } from '../../core/entity';

@Entity()
export class PostEntity extends CoreEntity {
	@Column({
		nullable: false
	})
	public title: string;

	@Column({
		nullable: false
	})
	public slug: string;

	@Column({
		nullable: false
	})
	public body: string;

	@Column({
		nullable: false,
		array: true
	})
	public tags: string;

	@ManyToOne(() => UserEntity)
	@Type(() => UserEntity)
	public author: UserEntity;

	@OneToMany(
		() => CommentEntity,
		comment => comment.post
	)
	@Type(() => CommentEntity)
	public comments: CommentEntity[];
}
