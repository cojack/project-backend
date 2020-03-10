import { GetRolesQuery } from './get-roles.query';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { RoleEntity } from '../../../entity';
import { Repository } from 'typeorm';

@QueryHandler(GetRolesQuery)
export class GetRolesHandler implements IQueryHandler<GetRolesQuery> {
	constructor(
		@InjectRepository(RoleEntity)
		private readonly repository: Repository<RoleEntity>
	) {}
	public async execute(query: GetRolesQuery): Promise<RoleEntity[]> {
		return this.repository.find(query);
	}
}
