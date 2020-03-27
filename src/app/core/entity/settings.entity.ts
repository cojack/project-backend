import { BaseEntity } from './base.entity';
import { Entity, JoinColumn, OneToOne } from 'typeorm';
import { SiteSettingsEntity } from './settings/site-settings.entity';
import { RegistrationSettingsEntity } from './settings/registration-settings.entity';


@Entity()
export class SettingsEntity extends BaseEntity {

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
