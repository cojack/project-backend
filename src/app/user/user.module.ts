import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import { CommandHandlers } from './command';
import { CqrsModule } from '@nestjs/cqrs';
import { UserAuthSaga } from './saga/user-auth.saga';

@Module({
	imports: [
		CqrsModule,
		TypeOrmModule.forFeature([UserRepository])
	],
	providers: [
		UserAuthSaga,
		...CommandHandlers
	]
})
export class UserModule {

}
