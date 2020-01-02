import { Injectable, NotFoundException } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { CredentialsDto, JwtDto, RegisterDto, TokenDto } from './dto';
import { LoginCommand, RegisterCommand } from './command';
import { JwtService } from './jwt.service';
import { UserEntity } from '../user/entity';

@Injectable()
export class AuthService {
	constructor(
		private readonly commandBus: CommandBus,
		private readonly jwtService: JwtService
	) {
	}

	public async login(credentials: CredentialsDto): Promise<{user: UserEntity, authToken: JwtDto}> {
		const user: UserEntity = await this.commandBus.execute(
			new LoginCommand(credentials)
		);
		if (!user) {
			throw new NotFoundException();
		}
		const authToken = this.jwtService.createAuthToken(user.uuid);
		return {user, authToken};
	}

	public register(data: RegisterDto): Promise<void> {
		return this.commandBus.execute(
			new RegisterCommand(data)
		);
	}

	public validateUser(payload: TokenDto) {
		return true;
	}
}
