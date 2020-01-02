import { AuthorizationCheckerInterface } from './authorization-checker.interface';
import { AccessDecisionManager, AccessDecisionStrategyEnum } from '../access-decision';

import { VoterRegistry } from '../voter';
import { TokenStorageInterface } from './token-storage.interface';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthorizationChecker implements AuthorizationCheckerInterface {
	private readonly adm: AccessDecisionManager;
	private readonly tokenStorage: () => TokenStorageInterface;

	constructor(voterRegistry: VoterRegistry) {
		this.adm = new AccessDecisionManager(voterRegistry.getVoters(), AccessDecisionStrategyEnum.STRATEGY_AFFIRMATIVE, true);
	}

	public async isGranted(user, attributes, subject = null) {
		const token = {getUser: async () => user};

		if (!Array.isArray(attributes)) {
			attributes = [attributes];
		}

		return this.adm.decide(token, attributes, subject);
	}
}
