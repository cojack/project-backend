import { UserEntity } from '../../entity';

export class UserLoginEvent {
	constructor(public readonly user: UserEntity) {}
}
