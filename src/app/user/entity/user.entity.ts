import { UserLoginEvent, UserRegisterEvent } from '../event';
import { Column, Entity, JoinTable, ManyToMany } from 'typeorm';
import { RoleEntity } from './role.entity';
import { CoreEntity } from '../../core/entity';
import { passwordHash } from '../../core/helper';
import { Validate } from 'class-validator';
import { PasswordStrengthValidator, UniqueEmailValidator } from './validator';
import { AccessControlService } from '../../security/service';
import { AclActionEnum, AclPossessionEnum } from '../../security/enum';

@Entity()
export class UserEntity extends CoreEntity {

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

	constructor(private readonly accessControlService: AccessControlService) {
		super();
	}

	public canAny(feature: string): void|boolean {
		return this.accessControlService.getAclPermission(this, feature, AclActionEnum.READ, AclPossessionEnum.ANY).granted;
	}

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
