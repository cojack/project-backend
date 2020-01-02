import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { accessControlProviders } from './access-control.providers';
import { VoterRegistry } from './voter';
import { AuthorizationChecker } from './authorization-checker';
import { AccessControlRepository } from './repository';
import { AccessControlService } from './service';
import { CrudGuard } from './guard';

const PROVIDERS_TO_EXPORT = [
	AccessControlService,
	CrudGuard,
	AuthorizationChecker,
	VoterRegistry
];

@Module({
	imports: [TypeOrmModule.forFeature([AccessControlRepository])],
	providers: [
		...accessControlProviders,
		...PROVIDERS_TO_EXPORT
	],
	exports: [
		...PROVIDERS_TO_EXPORT
	]
})
export class SecurityModule {

}
