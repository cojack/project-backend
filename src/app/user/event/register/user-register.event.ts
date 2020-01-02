import { UserEntity } from '../../entity';

export class UserRegisterEvent {
	constructor(public readonly user: UserEntity) {
	}
}
