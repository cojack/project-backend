import { AccessControl, Permission } from 'accesscontrol';
import { Action } from 'accesscontrol/lib/enums';
import { AccessControlEntity } from '../entity';
import { GRANT_LIST_TOKEN } from '../security.constants';
import { Inject, Injectable } from '@nestjs/common';
import { CrudActions } from '@nestjsx/crud';
import { UserEntity } from '../../user/entity';
import { AclActionEnum, AclPossessionEnum } from '../enum';

@Injectable()
export class AccessControlService {
	private readonly accessControl: AccessControl;

	constructor(@Inject(GRANT_LIST_TOKEN) private readonly grantList: AccessControlEntity[]) {
		this.accessControl = new AccessControl(grantList);
	}

	public getCrudPermission(user: UserEntity, resource: string, crudAction: CrudActions): Permission {
		const action = this.convertAction(crudAction);
		return this.accessControl.permission({
			role: user.roles.map(role => role.name),
			action,
			resource
		});
	}

	public getAclPermission(user: UserEntity, resource: string, action: AclActionEnum, possession: AclPossessionEnum): Permission {
		return this.accessControl.permission({
			role: user.roles.map(role => role.name),
			resource,
			action,
			possession
		});
	}

	private convertAction(action: CrudActions): string {
		switch (action) {
			case CrudActions.CreateMany:
				return Action.CREATE;
			case CrudActions.CreateOne:
				return Action.CREATE;
			case CrudActions.ReadAll:
				return Action.READ;
			case CrudActions.ReadOne:
				return Action.READ;
			case CrudActions.UpdateOne:
				return Action.UPDATE;
			case CrudActions.ReplaceOne:
				return Action.UPDATE;
			case CrudActions.DeleteAll:
				return Action.DELETE;
			case CrudActions.DeleteOne:
				return Action.DELETE;
		}
	}
}
