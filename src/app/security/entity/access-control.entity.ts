import { AggregateRoot } from '@nestjs/cqrs';
import {
	Column,
	CreateDateColumn,
	Entity,
	Generated,
	ManyToOne,
	OneToOne,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
	VersionColumn,
} from 'typeorm';
import { RoleEntity } from '../../user/entity/role.entity';
import { Type } from 'class-transformer';

@Entity()
export class AccessControlEntity extends AggregateRoot {

	@PrimaryGeneratedColumn()
	public id: string;

	@Column()
	@Generated('uuid')
	public uuid: string;

	@Column()
	public resource: string;

	@Column()
	public action: string;

	@Column()
	public possession: string;

	@ManyToOne(type => RoleEntity)
	@Type(() => RoleEntity)
	public role: RoleEntity;

	@CreateDateColumn()
	public createdAt: Date;

	@UpdateDateColumn()
	public updatedAt: Date;

	@VersionColumn()
	public version: number;
}
