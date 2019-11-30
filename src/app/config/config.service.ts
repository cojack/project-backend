import dotenv from 'dotenv-extended';
import Joi from '@hapi/joi';
import fs from 'fs';
import {Inject, Injectable} from '@nestjs/common';
import {CONFIG_FILE_PATH_TOKEN} from './config.const';

export type EnvConfig = Record<string, string>;

@Injectable()
export class ConfigService {
	private readonly envConfig: EnvConfig;

	constructor(@Inject(CONFIG_FILE_PATH_TOKEN) filePath: string) {
		const parsed = dotenv.load({includeProcessEnv: true});
		const appPackage = fs.readFileSync(`${__dirname}/../../../package.json`, {
			encoding: 'utf8'
		});
		const appData = JSON.parse(appPackage);
		this.envConfig = ConfigService.validateInput(parsed);
		this.envConfig.name = appData.name;
		this.envConfig.description = appData.description;
		this.envConfig.version = appData.version;
		console.log(this.envConfig);
	}

	get isProduction(): boolean {
		return this.envConfig.NODE_ENV === 'production';
	}

	get port(): number {
		return parseInt(this.envConfig.APP_PORT, 10);
	}

	get host(): string {
		return this.envConfig.APP_HOST;
	}

	get name(): string {
		return this.envConfig.name;
	}

	get description(): string {
		return this.envConfig.description;
	}

	get version(): string {
		return this.envConfig.version;
	}

	/**
	 * Ensures all needed variables are set, and returns the validated JavaScript object
	 * including the applied default values.
	 */
	private static validateInput(envConfig: EnvConfig): EnvConfig {
		const envVarsSchema: Joi.ObjectSchema = Joi.object({
			NODE_ENV: Joi.string()
				.valid('development', 'production', 'test', 'provision')
				.default('development'),
			APP_UUID: Joi.string().guid({
				version: [
					'uuidv4',
					'uuidv5'
				]
			}).required(),
			APP_SALT: Joi.string().required(),
			APP_PORT: Joi.number().default(3000),
			APP_HOST: Joi.string().ip({
				version: [
					'ipv4',
					'ipv6'
				],
				cidr: 'forbidden'
			}),
			APP_LOGGER_LEVEL: Joi.string()
				.valid('error', 'warn', 'info', 'verbose', 'debug', 'silly')
				.default('info'),
			API_AUTH_ENABLED: Joi.boolean().required(),
		});

		const {error, value: validatedEnvConfig} = envVarsSchema.validate(
			envConfig, {
				abortEarly: false
			}
		);
		if (error) {
			throw new Error(`Config validation error: ${error.message}`);
		}
		return validatedEnvConfig;
	}
}
