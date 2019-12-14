import { CommandHandler, ICommandHandler, EventPublisher } from '@nestjs/cqrs';
import { UserRepository } from '../../user.repository';
import { LoginCommand } from '../../../auth';

@CommandHandler(LoginCommand)
export class LoginHandler implements ICommandHandler<LoginCommand> {
	constructor(
		private readonly repository: UserRepository,
		private readonly publisher: EventPublisher
	) {}

	async execute(command: LoginCommand) {
		const { email, password } = command.credentials;
		const [user] = await this.repository.find({
			where: [{email}, {password}]
		});
		const hero = this.publisher.mergeObjectContext(user);
		hero.commit();
	}
}
