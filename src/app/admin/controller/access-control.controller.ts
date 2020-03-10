import { Controller, Get, Post, Render } from '@nestjs/common';
import { AdminService } from '../service/admin.service';
import { RoleEntity } from '../../user/entity';

@Controller('admin/acl')
export class AccessControlController {
	constructor(private readonly adminService: AdminService) {}

	@Render('@admin/acl/roles')
	@Get('/roles')
	public async getRolesAction(): Promise<{
		roles: RoleEntity[];
		resources: string[];
	}> {
		const roles = await this.adminService.getRoles();
		const grants = await this.adminService.getGrants();
		return { roles, resources: grants.map(grant => grant.resource) };
	}

	@Post('/roles')
	public postRolesAction(): void {
		return;
	}
}
