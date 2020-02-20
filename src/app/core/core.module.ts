import { Module } from '@nestjs/common';
import { CommandHandlers } from './command';
import { FixturesCli } from './fixtures.cli';
import { HealthController } from './controller/health.controller';

@Module({
	providers: [...CommandHandlers, FixturesCli],
	controllers: [HealthController]
})
export class CoreModule {

}
