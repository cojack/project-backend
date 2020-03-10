import { Injectable, NotFoundException } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CredentialsDto, JwtDto, RegisterDto, TokenDto } from './dto';
import { LoginCommand, RegisterCommand } from './command';
import { JwtService } from './jwt.service';
import { UserEntity } from '../user/entity';
import { RemoveTokenCommand, StoreTokenCommand } from '../security/cqrs';
import { TokenEntity } from '../security/entity';
import { GetTokenQuery } from '../security/cqrs/query/token/get-token.query';

@Injectable()
export class AuthService {
	constructor(private readonly commandBus: CommandBus, private readonly queryBus: QueryBus, private readonly jwtService: JwtService) {}

	public async login(credentials: CredentialsDto): Promise<{ user: UserEntity; authToken: JwtDto }> {
		const user: UserEntity = await this.commandBus.execute(new LoginCommand(credentials));
		if (!user) {
			throw new NotFoundException();
		}
		const authToken = this.jwtService.createAuthToken();

		await this.deleteToken(user);
		await this.storeToken(user, authToken);

		return { user, authToken };
	}

	public register(data: RegisterDto): Promise<void> {
		return this.commandBus.execute(new RegisterCommand(data));
	}

	public async validateToken(authToken: TokenDto): Promise<TokenEntity> {
		const token: TokenEntity = await this.queryBus.execute(new GetTokenQuery(authToken));
		if (!token) {
			throw new Error(`Token identity ${authToken.identity} not found in database`);
		}
		return token;
	}

	private async storeToken(user: UserEntity, authToken: JwtDto): Promise<TokenEntity> {
		return this.commandBus.execute(new StoreTokenCommand(user, authToken));
	}

	private async deleteToken(user: UserEntity): Promise<void> {
		return this.commandBus.execute(new RemoveTokenCommand(user));
	}
}
