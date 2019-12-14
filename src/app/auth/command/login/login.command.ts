import { CredentialsDto } from '../../dto';

export class LoginCommand {
	constructor(public readonly credentials: CredentialsDto) {
	}
}
