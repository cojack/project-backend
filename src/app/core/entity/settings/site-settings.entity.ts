import { CoreEntity } from '../core-entity';
import { Column, Entity } from 'typeorm';

@Entity()
export class SiteSettingsEntity extends CoreEntity {
	@Column()
	public name: string;

	@Column()
	public description: string;

	@Column()
	public domain: string;

	@Column()
	public url: string;

	@Column()
	public email: string;
}
