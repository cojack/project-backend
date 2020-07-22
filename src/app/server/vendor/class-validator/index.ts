import { INestApplication } from '@nestjs/common';
import { useContainer } from 'class-validator';
import { AppModule } from '../../../app.module';

export default function ClassValidatorVendor(app: INestApplication): void {
	useContainer(app.select(AppModule), { fallbackOnErrors: true });
}

