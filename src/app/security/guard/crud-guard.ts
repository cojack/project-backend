import { Request } from 'express';
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { getAction, getFeature } from '@nestjsx/crud';
import { AccessControlService } from '../service';
import { AuthorizationChecker } from '../adm/authorization-checker';
import { UserEntity } from '../../user/entity';

@Injectable()
export class CrudGuard implements CanActivate {
	constructor(
		private readonly authorizationChecker: AuthorizationChecker,
		private readonly accessControlService: AccessControlService
	) {}

	public async canActivate(context: ExecutionContext): Promise<boolean> {
		const handler = context.getHandler();
		const request: Request = context.switchToHttp().getRequest();
		const controller = context.getClass();

		const feature = getFeature(controller);
		const action = getAction(handler);

		const user = request.user as UserEntity;
		const aclPermission = this.accessControlService.getCrudPermission(user, feature, action);

		if (aclPermission.granted) {
			return aclPermission.granted;
		}

		return this.authorizationChecker.isGranted(user, action, {
			resource: feature,
			body: request.body,
			query: request.query,
			params: request.params
		});
	}
}
