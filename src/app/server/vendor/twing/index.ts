import { NestExpressApplication } from '@nestjs/platform-express';
import { ConfigService } from '../../../config';
import { registerTwigEngine } from '../../../core/helper';

export default function TwingVendor(app: NestExpressApplication, config: ConfigService): void {
	registerTwigEngine(app, config);
}
