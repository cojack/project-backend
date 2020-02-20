import { UserRegisterEvent } from '../../event';
import { Injectable } from '@nestjs/common';
import { delay, map } from 'rxjs/operators';
import { ICommand, ofType, Saga } from '@nestjs/cqrs';
import { Observable } from 'rxjs';
import { WelcomeMailCommand } from '../command';

@Injectable()
export class UserAuthSaga {
	@Saga()
	userRegister = (events$: Observable<any>): Observable<ICommand> => {
		return events$
			.pipe(
				ofType(UserRegisterEvent),
				delay(100),
				map(event => {
					return new WelcomeMailCommand(event.user);
				})
			);
	}
}
