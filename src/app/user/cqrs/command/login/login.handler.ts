import { CommandHandler, ICommandHandler, EventPublisher } from '@nestjs/cqrs';
import { UserRepository } from '../../../user.repository';
import { LoginCommand } from '../../../../auth';

@CommandHandler(LoginCommand)
export class LoginHandler implements ICommandHandler<LoginCommand> {
	constructor(
		private readonly repository: UserRepository,
		private readonly publisher: EventPublisher
	) {}

	async execute(command: LoginCommand) {
		const { email, password } = command.credentials;
		let user = await this.repository.findOne({
			where: {email, password}
		});
		if (!user) {
			return null;
		}
		user = this.publisher.mergeObjectContext(user);
		user.loginEvent();
		user.commit();
		return user;
	}
}
