import { IProcessor } from 'typeorm-fixtures-cli';
import { UserEntity } from '../../src/app/user';
import { passwordHash } from '../../src/app/core/helper';

export default class UserProcessor implements IProcessor<UserEntity> {
	preProcess(name: string, object: Partial<UserEntity>): Partial<UserEntity> {
		console.log(`User with email: ${object.email} have pwd: ${object.password}`);
		return { ...object,
			email: object.email.toLocaleLowerCase(),
			password: passwordHash(object.password, process.env.APP_SALT)
		};
	}
}
