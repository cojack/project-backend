import { Column, Entity, ManyToOne } from 'typeorm';
import { UserEntity } from '../../user/entity';
import { CoreEntity } from '../../core/entity';

@Entity()
export class TokenEntity extends CoreEntity {
	@Column({ nullable: false })
	public token: string;

	@Column({ nullable: false })
	public refreshToken: string;

	@ManyToOne(() => UserEntity)
	public user: UserEntity;

	@Column({ type: 'timestamp' })
	public expiresAt: Date;
}
