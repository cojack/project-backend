import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { CredentialsDto } from './dto';
import { LoginCommand } from './command';

@Injectable()
export class AuthService {
	constructor(private readonly commandBus: CommandBus) {
	}

	public async login(credentials: CredentialsDto) {
		return this.commandBus.execute(
			new LoginCommand(credentials)
		);
	}
}
