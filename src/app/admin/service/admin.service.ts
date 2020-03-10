import { Injectable } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { GetRolesQuery } from '../../user/cqrs/query/role';
import { RoleEntity } from '../../user/entity';
import { AccessControlEntity, GetGrantsQuery } from '../../security';

@Injectable()
export class AdminService {
	constructor(private readonly queryBus: QueryBus) {}

	public getRoles(): Promise<RoleEntity[]> {
		return this.queryBus.execute(new GetRolesQuery());
	}

	public getGrants(): Promise<AccessControlEntity[]> {
		return this.queryBus.execute(new GetGrantsQuery());
	}
}
