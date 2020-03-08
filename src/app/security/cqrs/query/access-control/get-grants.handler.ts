import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetGrantsQuery } from './get-grants.query';
import { AccessControlRepository } from '../../../repository';
import { AccessControlEntity } from '../../../entity';

@QueryHandler(GetGrantsQuery)
export class GetGrantsHandler implements IQueryHandler<GetGrantsQuery> {
	constructor(private readonly repository: AccessControlRepository) {
	}

	public async execute(query: GetGrantsQuery): Promise<AccessControlEntity[]> {
		return this.repository.find(query);
	}
}
