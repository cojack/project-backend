import cors from 'cors';
import helmet from 'helmet';
import query from 'qs-middleware';
import cookieParser from 'cookie-parser';
import { INestApplication } from '@nestjs/common';
import { ConfigService } from '../../../config';

export default function ExpressVendor(app: INestApplication, config: ConfigService): void {
	app.use(cors());
	app.use(cookieParser());
	app.use(query());
	if (config.isProduction) {
		app.use(helmet());
	}
}
