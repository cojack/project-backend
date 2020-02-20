import { UserEntity } from '../../../user/entity';

export interface TokenStorageInterface {
	getUser(): Promise<UserEntity>;
}
