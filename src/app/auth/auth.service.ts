import { Injectable, NotFoundException } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { CredentialsDto, JwtDto, RegisterDto } from './dto';
import { LoginCommand, RegisterCommand } from './command';
import { JwtService } from './jwt.service';
import { UserEntity } from '../user/entity';

@Injectable()
export class AuthService {
	constructor(
		private readonly commandBus: CommandBus,
		private readonly jwtService: JwtService,
	) {
	}

	public async login(credentials: CredentialsDto): Promise<JwtDto> {
		const user: UserEntity = await this.commandBus.execute(
			new LoginCommand(credentials)
		);
		if (!user) {
			throw new NotFoundException();
		}
		return this.jwtService.createAuthToken(user.uuid);
	}

	public register(data: RegisterDto): Promise<void> {
		return this.commandBus.execute(
			new RegisterCommand(data)
		);
	}
}
