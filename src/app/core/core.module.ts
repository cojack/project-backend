import { APP_FILTER } from '@nestjs/core';
import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommandHandlers } from './command';
import { FixturesCli } from './fixtures.cli';
import { HealthController } from './controller/health.controller';
import { SettingsRepository } from './repository';
import { ClassValidatorFilter } from './exception';
import { coreProviders } from './core.provider';

@Global()
@Module({
	imports: [TypeOrmModule.forFeature([SettingsRepository])],
	controllers: [HealthController],
	providers: [
		...CommandHandlers,
		...coreProviders,
		FixturesCli,
		{
			provide: APP_FILTER,
			useClass: ClassValidatorFilter
		}
	],
	exports: [TypeOrmModule, ...coreProviders]
})
export class CoreModule {}
