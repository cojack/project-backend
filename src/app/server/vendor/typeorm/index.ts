import {useContainer} from 'typeorm';
import { INestApplication } from '@nestjs/common';
import { AppModule } from '../../../app.module';

export default function TypeOrmVendor(app: INestApplication): void {
	useContainer(app.select(AppModule), { fallbackOnErrors: true });
}
