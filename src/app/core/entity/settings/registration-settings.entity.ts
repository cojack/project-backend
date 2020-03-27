import { Column, Entity } from 'typeorm';
import { PasswordStrengthEnum } from '../../enum';
import { BaseEntity } from '../base.entity';

@Entity()
export class RegistrationSettingsEntity extends BaseEntity {
	@Column()
	public enabled: boolean;

	@Column({
		type: 'smallint',
		enum: PasswordStrengthEnum
	})
	public passwordStrength: PasswordStrengthEnum;

	@Column()
	public notification: boolean;
}
