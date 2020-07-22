import { CoreEntity } from './core-entity';
import { Entity, JoinColumn, OneToOne } from 'typeorm';
import { SiteSettingsEntity } from './settings/site-settings.entity';
import { RegistrationSettingsEntity } from './settings/registration-settings.entity';


@Entity()
export class SettingsEntity extends CoreEntity {

	@OneToOne(() => SiteSettingsEntity, {
		eager: true
	})
	@JoinColumn()
	public site: SiteSettingsEntity;

	@OneToOne(() => RegistrationSettingsEntity, {
		eager: true
	})
	@JoinColumn()
	public registration: RegistrationSettingsEntity;
}
