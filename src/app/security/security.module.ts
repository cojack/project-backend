import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { accessControlProviders } from './access-control.providers';
import { VoterRegistry, AuthorizationChecker } from './adm';
import { AccessControlRepository, TokenRepository } from './repository';
import { AccessControlService } from './service';
import { CrudGuard, CookieGuard } from './guard';
import { CommandHandlers, QueryHandlers } from './cqrs';

const PROVIDERS_TO_EXPORT = [
	AccessControlService,
	CrudGuard,
	CookieGuard,
	AuthorizationChecker,
	VoterRegistry
];

@Module({
	imports: [TypeOrmModule.forFeature([
		AccessControlRepository,
		TokenRepository
	])],
	providers: [
		...accessControlProviders,
		...PROVIDERS_TO_EXPORT,
		...CommandHandlers,
		...QueryHandlers
	],
	exports: [
		...PROVIDERS_TO_EXPORT
	]
})
export class SecurityModule {

}
