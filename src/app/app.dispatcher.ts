import { NestFactory } from '@nestjs/core';
import { AppLogger } from './app.logger';
import { AppModule } from './app.module';
import { ConfigModule, ConfigService } from './config';
import { NestExpressApplication } from '@nestjs/platform-express';
import { Server } from './server';

export class AppDispatcher {
	private app: NestExpressApplication;
	private config: ConfigService;
	private logger = new AppLogger(AppDispatcher.name);

	public async dispatch(): Promise<void> {
		await this.createApp();
		await this.createServer();
		return this.listen();
	}

	public async shutdown(): Promise<void> {
		await this.app.close();
	}

	private async createApp(): Promise<void> {
		this.app = await NestFactory.create<NestExpressApplication>(AppModule, {
			logger: new AppLogger('Nest')
		});
		this.config = this.app.select<ConfigModule>(ConfigModule).get<ConfigService>(ConfigService);
	}

	private async createServer(): Promise<void> {
		const server = new Server(this.app, this.config);
		await server.bootstrap();
	}

	private async listen(): Promise<void> {
		await this.app.listen(this.config.port, this.config.host);
		this.logger.log(`App is listening http://${this.config.host}:${this.config.port}`);
	}
}
