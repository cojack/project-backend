import { UserLoginEvent, UserRegisterEvent } from '../event';
import { Column, Entity, JoinTable, ManyToMany } from 'typeorm';
import { RoleEntity } from './role.entity';
import { BaseEntity } from '../../core/entity';
import { passwordHash } from '../../core/helper';
import { Validate } from 'class-validator';
import { PasswordStrengthValidator, UniqueEmailValidator } from './validator';

@Entity()
export class UserEntity extends BaseEntity {

	@Validate(UniqueEmailValidator)
	@Column({
		unique: true,
		nullable: false
	})
	public email: string;

	@Validate(PasswordStrengthValidator)
	@Column({
		nullable: false
	})
	public password: string;

	@ManyToMany(() => RoleEntity, {
		eager: true
	})
	@JoinTable()
	public roles: RoleEntity[];

	public hashPassword(salt: string): void {
		this.password = passwordHash(this.password, salt);
	}

	public loginEvent(): void {
		this.apply(new UserLoginEvent(this));
	}

	public registerEvent(): void {
		this.apply(new UserRegisterEvent(this));
	}
}
