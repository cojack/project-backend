import swStats from 'swagger-stats';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { INestApplication } from '@nestjs/common';
import { ConfigService } from '../../../config';
import { AppLogger } from '../../../app.logger';

export default function SwaggerVendor(app: INestApplication, config: ConfigService): void {
	const logger = new AppLogger('SwaggerVendor');
	const options = new DocumentBuilder()
		.setTitle(config.name)
		.setDescription(config.description)
		.setVersion(config.version)
		.addBearerAuth()
		.build();

	const document = SwaggerModule.createDocument(app, options);
	SwaggerModule.setup('/swagger', app, document);
	app.use(
		swStats.getMiddleware({
			swaggerSpec: document,
			uriPath: '/swagger-stats'
		})
	);

	logger.log(`[bootstrap] Swagger is exposed at http://${config.host}:${config.port}/swagger`);
	logger.log(`[bootstrap] Stats are exposed at http://${config.host}:${config.port}/swagger-stats/ux`);
}
