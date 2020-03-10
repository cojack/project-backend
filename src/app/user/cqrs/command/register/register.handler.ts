import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { UserRepository } from '../../../user.repository';
import { RegisterCommand } from '../../../../auth';

@CommandHandler(RegisterCommand)
export class RegisterHandler implements ICommandHandler<RegisterCommand> {
	constructor(private readonly repository: UserRepository, private readonly publisher: EventPublisher) {}

	public async execute(command: RegisterCommand): Promise<void> {
		let user = this.repository.create(command.register);
		user = await this.repository.save(user);
		user = this.publisher.mergeObjectContext(user);
		user.registerEvent();
		user.commit();
	}
}
