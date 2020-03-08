import { Abstract, DynamicModule, Global, Module, Provider, Type } from '@nestjs/common';
import { ConfigService } from './config.service';
import { TypeOrmConfigService } from './typeorm-config.service';
import { ENVIRONMENT_PROVIDER } from './config.constant';

const SERVICES: Provider[] = [
	ConfigService,
	TypeOrmConfigService
];

@Global()
@Module({})
export class ConfigModule {
	public static forRoot(providers: Provider[] = []): DynamicModule {
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

	public static forRootAsync(options: {
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		inject?: Array<Type<any> | string | symbol | Abstract<any> | Function>;
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		useFactory: (...args: any) => any;
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
