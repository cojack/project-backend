import { Global, Module } from '@nestjs/common';
import { ConfigService } from './config.service';
import { TypeOrmConfigService } from './typeorm-config.service';

const SERVICES = [
	ConfigService,
	TypeOrmConfigService
];

@Global()
@Module({
	providers: [
		...SERVICES
	],
	exports: [
		...SERVICES
	]
})
export class ConfigModule {
}
