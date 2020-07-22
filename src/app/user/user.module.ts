import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommandHandlers } from './cqrs/command';
import { CqrsModule } from '@nestjs/cqrs';
import { UserAuthSaga } from './cqrs/saga';
import { PasswordStrengthValidator, UniqueEmailValidator } from './entity/validator';
import { QueryHandlers } from './cqrs/query';
import { RoleRepository, UserRepository } from './repository';
import { userProviders } from './user.provider';

@Module({
	imports: [CqrsModule, TypeOrmModule.forFeature([UserRepository, RoleRepository])],
	providers: [...CommandHandlers, ...QueryHandlers, ...userProviders, UserAuthSaga, UniqueEmailValidator, PasswordStrengthValidator],
	exports: [TypeOrmModule]
})
export class UserModule {

}
