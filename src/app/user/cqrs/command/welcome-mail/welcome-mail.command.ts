import { UserEntity } from '../../../entity';

export class WelcomeMailCommand {
	constructor(public readonly user: UserEntity) {}
}
