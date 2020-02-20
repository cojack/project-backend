import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetGrantsQuery } from './get-grants.query';
import { AccessControlRepository } from '../../../repository';

@QueryHandler(GetGrantsQuery)
export class GetGrantsHandler implements IQueryHandler<GetGrantsQuery> {
	constructor(private readonly repository: AccessControlRepository) {
	}

	async execute(query: GetGrantsQuery) {
		return this.repository.find();
	}
}
