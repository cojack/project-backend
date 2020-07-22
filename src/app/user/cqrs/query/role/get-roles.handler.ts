import { GetRolesQuery } from './get-roles.query';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { RoleEntity } from '../../../entity';
import { RoleRepository } from '../../../repository';

@QueryHandler(GetRolesQuery)
export class GetRolesHandler implements IQueryHandler<GetRolesQuery> {
	constructor(
		private readonly repository: RoleRepository
	) {}
	public async execute(query: GetRolesQuery): Promise<RoleEntity[]> {
		return this.repository.find(query);
	}
}
