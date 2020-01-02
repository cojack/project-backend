import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { useContainer } from 'class-validator';
import cors from 'cors';
import helmet from 'helmet';
import query from 'qs-middleware';
import cookieParser from 'cookie-parser';
import { AppLogger } from './app.logger';
import { AppModule } from './app.module';
import { ConfigModule, ConfigService } from './config';
import { registerTwigEngine } from './core';
import { NestExpressApplication } from '@nestjs/platform-express';

export class AppDispatcher {
	private app: NestExpressApplication;
	private config: ConfigService;
	private logger = new AppLogger(AppDispatcher.name);

	async dispatch(): Promise<void> {
		await this.createServer();
		return this.startServer();
	}

	async shutdown(): Promise<void> {
		await this.app.close();
	}

	private async createServer(): Promise<void> {
		this.app = await NestFactory.create<NestExpressApplication>(AppModule, {
			logger: new AppLogger('Nest')
		});
		registerTwigEngine(this.app);
		this.config = this.app.select<ConfigModule>(ConfigModule).get<ConfigService>(ConfigService);
		useContainer(this.app.select(AppModule), { fallbackOnErrors: true });
		this.app.use(cors());
		this.app.use(cookieParser());
		this.app.use(query());
		if (this.config.isProduction) {
			this.app.use(helmet());
		}
		const options = new DocumentBuilder()
			.setTitle(this.config.name)
			.setDescription(this.config.description)
			.setVersion(this.config.version)
			.addBearerAuth()
			.build();

		const document = SwaggerModule.createDocument(this.app, options);
		SwaggerModule.setup('/swagger', this.app, document);
	}

	private async startServer(): Promise<void> {
		await this.app.listen(this.config.port, this.config.host);
		this.logger.log(`Swagger is exposed at http://${this.config.host}:${this.config.port}/swagger`);
		this.logger.log(`Server is listening http://${this.config.host}:${this.config.port}`);
	}
}
