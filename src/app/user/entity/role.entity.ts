import { Column, Entity } from 'typeorm';
import { BaseEntity } from '../../core/entity';

@Entity()
export class RoleEntity extends BaseEntity {
	@Column({unique: true, nullable: false})
	public name: string;
}
