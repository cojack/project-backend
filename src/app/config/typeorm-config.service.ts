import { Injectable } from '@nestjs/common';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import process from 'process';
import { ConfigService } from './config.service';

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
	constructor(private readonly configService: ConfigService) {}

	public createTypeOrmOptions(): TypeOrmModuleOptions {
		return {
			retryAttempts: 1,
			logging: ['error'],
			type: 'postgres',
			host: this.configService.getEnv('APP_DATABASE_HOST'),
			port: parseInt(this.configService.getEnv('APP_DATABASE_PORT'), 10),
			username: this.configService.getEnv('APP_DATABASE_USER'),
			password: this.configService.getEnv('APP_DATABASE_PASSWORD'),
			database: this.configService.getEnv('APP_DATABASE_NAME'),
			entities: [process.cwd() + '/**/*.entity{.ts,.js}'],
			migrations: [process.cwd() + '/**/*.migration{.ts,.js}'],
			synchronize: true,
			cache: {
				type: this.configService.getEnv('APP_CACHE_TYPE'),
				options: {
					host: this.configService.getEnv('APP_CACHE_HOST'),
					port: this.configService.getEnv('APP_CACHE_PORT')
				},
				duration: 3600
			}
		};
	}
}
