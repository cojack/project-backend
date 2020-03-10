import { RegisterDto } from '../../dto';

export class RegisterCommand {
	constructor(public readonly register: RegisterDto) {}
}
