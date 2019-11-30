import {CONFIG_FILE_PATH_TOKEN} from './config.const';

export const configProviders = [
	{
		provide: CONFIG_FILE_PATH_TOKEN,
		useValue: '.env'
	}
];
