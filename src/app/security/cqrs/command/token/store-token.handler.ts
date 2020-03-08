import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { TokenRepository } from '../../../repository';
import { TokenEntity } from '../../../entity';
import { StoreTokenCommand } from './store-token.command';

@CommandHandler(StoreTokenCommand)
export class StoreTokenHandler implements ICommandHandler<StoreTokenCommand> {
	constructor(private readonly tokenRepository: TokenRepository) {
	}

	public execute(command: StoreTokenCommand): Promise<TokenEntity> {
		const { authToken, user } = command;
		const tokenEntity = this.tokenRepository.create({
			uuid: authToken.uuid,
			token: authToken.accessToken,
			refreshToken: authToken.refreshToken,
			expiresAt: authToken.expiresAt,
			user
		});
		return this.tokenRepository.save(tokenEntity);
	}
}
