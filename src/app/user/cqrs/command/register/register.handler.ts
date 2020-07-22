import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { UserRepository } from '../../../repository';
import { RegisterCommand } from '../../../../auth';
import { validateOrReject } from 'class-validator';
import { ConfigService } from '../../../../config';

@CommandHandler(RegisterCommand)
export class RegisterHandler implements ICommandHandler<RegisterCommand> {
	constructor(
		private readonly config: ConfigService,
		private readonly repository: UserRepository,
		private readonly publisher: EventPublisher
	) {}

	public async execute(command: RegisterCommand): Promise<void> {
		let user = this.repository.create(command.register);
		await validateOrReject(user);
		user.hashPassword(this.config.getEnv('APP_SALT'));
		user = await this.repository.save(user);
		user = this.publisher.mergeObjectContext(user);
		user.registerEvent();
		user.commit();
	}
}
