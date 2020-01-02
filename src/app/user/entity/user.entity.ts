import { AggregateRoot } from '@nestjs/cqrs';
import { UserLoginEvent, UserRegisterEvent } from '../event';
import {
	Column,
	CreateDateColumn,
	Entity,
	Generated,
	JoinTable,
	ManyToMany,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
	VersionColumn
} from 'typeorm';
import { RoleEntity } from './role.entity';

@Entity()
export class UserEntity extends AggregateRoot {

	@PrimaryGeneratedColumn()
	public id: string;

	@Column()
	@Generated('uuid')
	public uuid: string;

	@Column({
		unique: true,
		nullable: false
	})
	public email: string;

	@Column({
		nullable: false
	})
	public password: string;

	@ManyToMany(type => RoleEntity)
	@JoinTable()
	public roles: RoleEntity[];

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
