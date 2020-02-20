import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { RemoveTokenCommand } from './remove-token.command';
import { TokenRepository } from '../../../repository';

@CommandHandler(RemoveTokenCommand)
export class RemoveTokenHandler implements ICommandHandler<RemoveTokenCommand> {
	constructor(private readonly tokenRepository: TokenRepository) {
	}

	public async execute(command: RemoveTokenCommand): Promise<void> {
		await this.tokenRepository.delete({ user: command.user });
	}
}
