import { UserEntity } from './entity';
import { Connection, Repository } from 'typeorm';
import { USER_REPOSITORY } from './user.constant';

export const userProviders = [
	{
		provide: USER_REPOSITORY,
		useFactory: (connection: Connection): Repository<UserEntity> => connection.getRepository(UserEntity),
		inject: [Connection]
	}
];
