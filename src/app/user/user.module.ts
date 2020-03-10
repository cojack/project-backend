import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import { CommandHandlers } from './cqrs/command';
import { CqrsModule } from '@nestjs/cqrs';
import { UserAuthSaga } from './cqrs/saga/user-auth.saga';
import { RoleEntity } from './entity';
import { QueryHandlers } from './cqrs/query';

@Module({
	imports: [CqrsModule, TypeOrmModule.forFeature([UserRepository, RoleEntity])],
	providers: [...CommandHandlers, ...QueryHandlers, UserAuthSaga]
})
export class UserModule {}
