import { UserEntity } from '../../../../user/entity';
import { JwtDto } from '../../../../auth/dto';

export class StoreTokenCommand {
	constructor(public readonly user: UserEntity, public readonly authToken: JwtDto) {
	}
}
