import { INestApplication } from '@nestjs/common';
import {promisify} from 'util';
import { readdir } from 'fs';
import { ConfigService } from '../config';
import { AppLogger } from '../app.logger';

export class Server {
	private logger = new AppLogger(Server.name);

	constructor(private readonly app: INestApplication, private readonly config: ConfigService) {
	}

	public async bootstrap(): Promise<void> {
		const readdirAsync = promisify(readdir);
		const modules = await readdirAsync(`${__dirname}/vendor`);
		for (const moduleName of modules) {
			const vendor = await import(`${__dirname}/vendor/${moduleName}/index`);
			this.logger.verbose(`[bootstrap] ${moduleName} start`);
			vendor.default(this.app, this.config);
			this.logger.debug(`[bootstrap] ${moduleName} bootstrapped`);
		}
	}
}
