import { Abstract, DynamicModule, Global, Module, OnModuleInit, Provider, Type } from '@nestjs/common';
import { ConfigService } from './config.service';
import { TypeOrmConfigService } from './typeorm-config.service';
import { ENVIRONMENT_PROVIDER } from './config.constant';

const SERVICES: any = [
	ConfigService,
	TypeOrmConfigService
];

@Global()
@Module({})
export class ConfigModule {
	static  forRoot(providers?: Provider[]) {
		if (providers.length) {
			SERVICES.push(...providers);
		}
		return {
			module: ConfigModule,
			providers: [
				...SERVICES
			],
			exports: [
				...SERVICES
			]
		};
	}

	static forRootAsync(options: {
		inject?: Array<Type<any> | string | symbol | Abstract<any> | Function>,
		useFactory: (...args: any) => any
	}): DynamicModule {
		const provider: Provider = {
			provide: ENVIRONMENT_PROVIDER,
			useFactory: options.useFactory,
			inject: options.inject ?? []
		};

		SERVICES.push(provider);

		return {
			module: ConfigModule,
			providers: [
				...SERVICES
			],
			exports: [
				...SERVICES
			]
		};
	}
}
