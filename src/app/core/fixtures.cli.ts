import * as path from 'path';
import { Command, Positional } from 'nestjs-command';
import { Builder, fixturesIterator, Loader, Parser, Resolver } from 'typeorm-fixtures-cli/dist';
import { Injectable } from '@nestjs/common';
import { getRepository, getConnection } from 'typeorm';

@Injectable()
export class FixturesCli {
	constructor() { }

	@Command({ command: 'fixtures <fixturesPath>', describe: 'load fixtures', autoExit: true })
	async create(@Positional({
		name: 'fixturesPath',
		describe: 'path to the fixtures',
		type: 'string',
	}) fixturesPath: string) {
		const loader = new Loader();
		loader.load(path.resolve(fixturesPath));

		const resolver = new Resolver();
		const fixtures = resolver.resolve(loader.fixtureConfigs);
		const builder = new Builder(getConnection(), new Parser());

		for (const fixture of fixturesIterator(fixtures)) {
			const entity = await builder.build(fixture);
			await getRepository(entity.constructor.name).save(entity);
		}
	}
}
