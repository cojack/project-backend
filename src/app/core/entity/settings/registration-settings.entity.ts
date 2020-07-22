import { Column, Entity } from 'typeorm';
import { PasswordStrengthEnum } from '../../enum';
import { CoreEntity } from '../core-entity';

@Entity()
export class RegistrationSettingsEntity extends CoreEntity {
	@Column()
	public enabled: boolean;

	@Column({
		type: 'smallint',
		enum: PasswordStrengthEnum,
		comment: '0 - TOO_GUESSABLE, 1 - VERY_GUESSABLE, 2 - SOMEWHAT_GUESSABLE, 3 - SAFELY_UNGUESSABLE, 4 - VERY_UNGUESSABLE'
	})
	public passwordStrength: PasswordStrengthEnum;

	@Column()
	public notification: boolean;
}
