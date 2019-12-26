import { AggregateRoot } from '@nestjs/cqrs';
import { UserLoginEvent, UserRegisterEvent } from '../event';
import { Column, CreateDateColumn, Entity, Generated, PrimaryGeneratedColumn, UpdateDateColumn, VersionColumn } from 'typeorm';

@Entity()
export class UserEntity extends AggregateRoot {

	@PrimaryGeneratedColumn()
	public id: string;

	@Column()
	@Generated('uuid')
	public uuid: string;

	@Column()
	public email: string;

	@Column()
	public password: string;

	@CreateDateColumn()
	public createdAt: Date;

	@UpdateDateColumn()
	public updatedAt: Date;

	@VersionColumn()
	public version: number;

	public loginEvent(): void {
		this.apply(new UserLoginEvent(this));
	}

	public registerEvent(): void {
		this.apply(new UserRegisterEvent(this));
	}
}
