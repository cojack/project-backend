import { AggregateRoot } from '@nestjs/cqrs';
import { UserLoginEvent } from '../event';

export class UserEntity extends AggregateRoot {
	public id: string;
	public email: string;
	public password: string;

	loginEvent() {
		this.apply(new UserLoginEvent(this.id));
	}
}
