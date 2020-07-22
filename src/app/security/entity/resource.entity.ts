import { CoreEntity } from '../../core/entity';
import { Column, Entity } from 'typeorm';

@Entity()
export class ResourceEntity extends CoreEntity {
	@Column({ nullable: false })
	public name: string;
}
