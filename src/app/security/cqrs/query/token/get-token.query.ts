import { TokenDto } from '../../../../auth/dto';

export class GetTokenQuery {
	constructor(public token: TokenDto) {}
}
