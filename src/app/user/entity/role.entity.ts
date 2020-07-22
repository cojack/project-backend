import { Column, Entity } from 'typeorm';
import { CoreEntity } from '../../core/entity';

@Entity()
export class RoleEntity extends CoreEntity {
	@Column({ unique: true, nullable: false })
	public name: string;
}
