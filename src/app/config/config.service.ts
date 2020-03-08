import dotenv from 'dotenv-extended';
import Joi from '@hapi/joi';
import fs from 'fs';
import { Injectable } from '@nestjs/common';
import { EnvInterface, EnvSchema } from './env.schema';

export type EnvConfig = Record<string, string>;

@Injectable()
export class ConfigService {
	private readonly envConfig: EnvConfig;

	constructor() {
		const parsed = dotenv.load();
		const appPackage = fs.readFileSync(`${__dirname}/../../../package.json`, {
			encoding: 'utf8'
		});
		const appData = JSON.parse(appPackage);
		this.envConfig = ConfigService.validateInput(parsed);
		this.envConfig.name = appData.name;
		this.envConfig.description = appData.description;
		this.envConfig.version = appData.version;
	}

	public get isProduction(): boolean {
		return this.envConfig.NODE_ENV === 'production';
	}

	public get port(): number {
		return parseInt(this.envConfig.APP_PORT, 10);
	}

	public get host(): string {
		return this.envConfig.APP_HOST;
	}

	public get name(): string {
		return this.envConfig.name;
	}

	public get description(): string {
		return this.envConfig.description;
	}

	public get version(): string {
		return this.envConfig.version;
	}

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	public getEnv(name: keyof EnvInterface): any {
		return this.envConfig[name];
	}

	/**
	 * Ensures all needed variables are set, and returns the validated JavaScript object
	 * including the applied default values.
	 */
	private static validateInput(envConfig: EnvConfig): EnvConfig {
		const envVarsSchema: Joi.ObjectSchema = Joi.object(EnvSchema);

		const { error, value: validatedEnvConfig } = envVarsSchema.validate(
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
