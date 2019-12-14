import {Module} from '@nestjs/common';
import {ConfigService} from './config.service';
import { TypeOrmConfigService } from './typeorm-config.service';

const SERVICES = [
	ConfigService,
	TypeOrmConfigService
];

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
