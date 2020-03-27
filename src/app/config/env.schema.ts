import Joi from '@hapi/joi';

const DAY_IN_SECONDS = 86400;

export interface EnvInterface {
	NODE_ENV: string;
	APP_UUID: string;
	APP_SALT: string;
	APP_PORT: string;
	APP_HOST: string;
	APP_LOGGER_LEVEL: string;
	API_AUTH_ENABLED: string;
	APP_DATABASE_HOST: string;
	APP_DATABASE_PORT: string;
	APP_DATABASE_USER: string;
	APP_DATABASE_PASSWORD: string;
	APP_DATABASE_NAME: string;
	APP_DATABASE_cache: boolean;
	APP_SESSION_SECRET: string;
	APP_SESSION_TIMEOUT: string;
	APP_SESSION_DOMAIN: string;
	APP_SESSION_REFRESH_SECRET: string;
	APP_SESSION_REFRESH_TIMEOUT: string;
	APP_COOKIE_NAME: string;
	APP_COOKIE_SIGNED: boolean;
}

export const EnvSchema = {
	NODE_ENV: Joi.string()
		.valid('development', 'production', 'test', 'provision')
		.default('development'),
	APP_UUID: Joi.string()
		.guid({
			version: ['uuidv4', 'uuidv5']
		})
		.required(),
	APP_SALT: Joi.string().required(),
	APP_PORT: Joi.number().default(3000),
	APP_HOST: Joi.string().ip({
		version: ['ipv4', 'ipv6'],
		cidr: 'forbidden'
	}),
	APP_LOGGER_LEVEL: Joi.string()
		.valid('error', 'warn', 'info', 'verbose', 'debug', 'silly')
		.default('info'),
	APP_DATABASE_HOST: Joi.string().default('127.0.0.1'),
	APP_DATABASE_PORT: Joi.number().default(5432),
	APP_DATABASE_USER: Joi.string().required(),
	APP_DATABASE_PASSWORD: Joi.string().required(),
	APP_DATABASE_NAME: Joi.string().required(),
	APP_DATABASE_CACHE: Joi.boolean().default(false),
	APP_SESSION_SECRET: Joi.string().required(),
	APP_SESSION_TIMEOUT: Joi.number().default(DAY_IN_SECONDS),
	APP_SESSION_DOMAIN: Joi.string().required(),
	APP_SESSION_REFRESH_SECRET: Joi.string().required(),
	APP_SESSION_REFRESH_TIMEOUT: Joi.number().default(DAY_IN_SECONDS * 2),
	APP_COOKIE_NAME: Joi.string().default('token'),
	APP_COOKIE_SIGNED: Joi.boolean().default(true)
};
