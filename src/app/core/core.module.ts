import { Module } from '@nestjs/common';
import { CommandHandlers } from './command';
import { FixturesCli } from './fixtures.cli';

@Module({
	providers: [...CommandHandlers, FixturesCli]
})
export class CoreModule {

}
