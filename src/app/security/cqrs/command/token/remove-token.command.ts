import { UserEntity } from '../../../../user/entity';

export class RemoveTokenCommand {
	constructor(public readonly user: UserEntity) {
	}
}
