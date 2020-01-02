import { Injectable } from '@nestjs/common';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import process from 'process';
import { ConfigService } from './config.service';

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
	constructor(private readonly configService: ConfigService) {

	}

	createTypeOrmOptions(): TypeOrmModuleOptions {
		return {
			retryAttempts: 1,
			logging: ['query', 'error', 'schema'],
			type: 'postgres',
			host: this.configService.getEnv('APP_DATABASE_HOST'),
			port: parseInt(this.configService.getEnv('APP_DATABASE_PORT'), 10),
			username: this.configService.getEnv('APP_DATABASE_USER'),
			password: this.configService.getEnv('APP_DATABASE_PASSWORD'),
			database: this.configService.getEnv('APP_DATABASE_NAME'),
			entities: [process.cwd() + '/**/*.entity{.ts,.js}'],
			synchronize: true
			// migrations: [process.cwd() + '/**/*.migration{.ts,.js}']
		};
	}
}
