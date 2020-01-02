import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn, VersionColumn } from 'typeorm';
import { UserEntity } from '../../user/entity';

@Entity()
export class CookieEntity {

	@PrimaryGeneratedColumn()
	public id: number;

	@Column({type: 'uuid'})
	public uuid: string;

	@Column({unique: true})
	public token: string;

	@ManyToOne(() => UserEntity)
	public user: UserEntity;

	@Column({type: 'timestamp'})
	public expiresAt: Date;

	@CreateDateColumn()
	public createdAt: Date;

	@UpdateDateColumn()
	public updatedAt: Date;

	@VersionColumn()
	public version: number;
}
