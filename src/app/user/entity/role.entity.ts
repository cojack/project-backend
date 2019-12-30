import { AggregateRoot } from '@nestjs/cqrs';
import { Column, CreateDateColumn, Entity, Generated, PrimaryGeneratedColumn, Unique, UpdateDateColumn, VersionColumn } from 'typeorm';

@Entity()
export class RoleEntity extends AggregateRoot {

	@PrimaryGeneratedColumn()
	public id: string;

	@Column()
	@Generated('uuid')
	public uuid: string;

	@Column({unique: true, nullable: false})
	public name: string;

	@CreateDateColumn()
	public createdAt: Date;

	@UpdateDateColumn()
	public updatedAt: Date;

	@VersionColumn()
	public version: number;
}
