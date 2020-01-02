import { Voter, VoterRegistry } from '../../security/voter';
import { Injectable } from '@nestjs/common';
import { CrudActions } from '@nestjsx/crud';
import { InjectRepository } from '@nestjs/typeorm';
import { PostEntity } from '../entity/post.entity';
import { Repository } from 'typeorm';
import { CrudSubjectInterface } from '../../security/interface';
import { AccessControlService } from '../../security/service';
import { AclActionEnum, AclPossessionEnum } from '../../security/enum';

@Injectable()
export class PostVoter extends Voter {
	static readonly RESOURCE = 'posts';

	private readonly attributes = [
		CrudActions.ReadOne,
		CrudActions.DeleteOne,
		CrudActions.UpdateOne
	];

	constructor(
		@InjectRepository(PostEntity) private readonly repository: Repository<PostEntity>,
		private readonly voterRegistry: VoterRegistry,
		private readonly accessControlService: AccessControlService
	) {
		super();
		this.voterRegistry.register(this);
	}

	protected supports(attribute: CrudActions, subject: CrudSubjectInterface): boolean {
		if (subject.resource !== PostVoter.RESOURCE) {
			return false;
		}
		return this.attributes.includes(attribute);
	}

	protected async voteOnAttribute(attribute: CrudActions, subject: CrudSubjectInterface, token): Promise<boolean> {
		switch (attribute) {
			case CrudActions.ReadOne:
				return this.canRead(attribute, subject, token);
		}
	}

	private async canRead(attribute: CrudActions, subject: CrudSubjectInterface, token) {
		const user = await token.getUser();
		const post = await this.repository.findOne(subject.params.id);
		const permission = this.accessControlService.getAclPermission(user, subject.resource, AclActionEnum.READ, AclPossessionEnum.OWN);
		return permission.granted && post.author === user;
	}
}
