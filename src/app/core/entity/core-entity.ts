import { Column, CreateDateColumn, Generated, PrimaryGeneratedColumn, UpdateDateColumn, VersionColumn } from 'typeorm';
import { AggregateRoot } from '@nestjs/cqrs';

export class CoreEntity extends AggregateRoot {
	@PrimaryGeneratedColumn()
	public id: number;

	@Column()
	@Generated('uuid')
	public uuid: string;

	@CreateDateColumn()
	public createdAt: Date;

	@UpdateDateColumn()
	public updatedAt: Date;

	@VersionColumn()
	public version: number;
}
