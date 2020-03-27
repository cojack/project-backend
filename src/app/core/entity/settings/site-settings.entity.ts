import { BaseEntity } from '../base.entity';
import { Column, Entity } from 'typeorm';

@Entity()
export class SiteSettingsEntity extends BaseEntity {
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
