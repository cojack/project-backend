import { REDIS_CLIENT } from './core.constant';
import { ConfigService } from '../config';
import { createClient, RedisClient } from 'redis';

export const coreProviders = [
	{
		provide: REDIS_CLIENT,
		useFactory: (configService: ConfigService): RedisClient => createClient({
			host: configService.getEnv('APP_CACHE_HOST'),
			port: configService.getEnv('APP_CACHE_PORT')
		}),
		inject: [ConfigService]
	}
];
