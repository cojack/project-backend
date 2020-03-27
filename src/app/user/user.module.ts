import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from './repository';
import { CommandHandlers } from './cqrs/command';
import { CqrsModule } from '@nestjs/cqrs';
import { UserAuthSaga } from './cqrs/saga';
import { PasswordStrengthValidator, RoleEntity, UniqueEmailValidator, UserEntity } from './entity';
import { QueryHandlers } from './cqrs/query';

@Module({
	imports: [CqrsModule, TypeOrmModule.forFeature([UserRepository, UserEntity, RoleEntity])],
	providers: [...CommandHandlers, ...QueryHandlers, UserAuthSaga, PasswordStrengthValidator, UniqueEmailValidator],
	exports: [TypeOrmModule]
})
export class UserModule {}
