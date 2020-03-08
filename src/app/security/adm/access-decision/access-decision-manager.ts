import { AccessDecisionManagerInterface } from './access-decision-manager.interface';
import { AccessDecisionStrategyEnum } from './access-decision-strategy.enum';
import { AccessEnum, Voter } from '../voter';
import { TokenStorageInterface } from '../authorization-checker';

export class AccessDecisionManager implements AccessDecisionManagerInterface {

	constructor(
		private voters: Set<Voter>,
		private strategy: AccessDecisionStrategyEnum = AccessDecisionStrategyEnum.STRATEGY_AFFIRMATIVE,
		private allowIfAllAbstainDecisions: boolean = false,
		private allowIfEqualGrantedDeniedDecisions: boolean = true
	) {
	}

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	public async decide(token: TokenStorageInterface, attributes: any[], object: any): Promise<boolean> {
		switch (this.strategy) {
			case AccessDecisionStrategyEnum.STRATEGY_AFFIRMATIVE:
				return this.decideAffirmative(token, attributes, object);
			case AccessDecisionStrategyEnum.STRATEGY_CONSENSUS:
				return this.decideConsensus(token, attributes, object);
			case AccessDecisionStrategyEnum.STRATEGY_UNANIMOUS:
				return this.decideUnanimous(token, attributes, object);
			default:
				throw new Error(`The strategy "${this.strategy}" is not supported.`);
		}
	}

	private async decideAffirmative(token, attributes, object): Promise<boolean> {
		let deny = 0;
		for (const voter of this.voters) {
			const result = await voter.vote(token, object, attributes);
			switch (result) {
				case AccessEnum.ACCESS_GRANTED:
					return true;
				case AccessEnum.ACCESS_DENIED:
					++deny;
					break;
				default:
					break;
			}
		}
		if (deny > 0) {
			return false;
		}
		return this.allowIfAllAbstainDecisions;
	}

	private async decideConsensus(token, attributes, object = null): Promise<boolean> {
		let grant = 0;
		let deny = 0;
		for (const voter of this.voters) {
			const result = await voter.vote(token, object, attributes);
			switch (result) {
				case AccessEnum.ACCESS_GRANTED:
					++grant;
					break;
				case AccessEnum.ACCESS_DENIED:
					++deny;
					break;
			}
		}
		if (grant > deny) {
			return true;
		}
		if (deny > grant) {
			return false;
		}
		if (grant > 0) {
			return this.allowIfEqualGrantedDeniedDecisions;
		}
		return this.allowIfAllAbstainDecisions;
	}

	private async decideUnanimous(token, attributes, object = null): Promise<boolean> {
		let grant = 0;
		for (const voter of this.voters) {
			for (const attribute of attributes) {
				const result = await voter.vote(token, object, [attribute]);
				switch (result) {
					case AccessEnum.ACCESS_GRANTED:
						++grant;
						break;
					case AccessEnum.ACCESS_DENIED:
						return false;
					default:
						break;
				}
			}
		}
		if (grant > 0) {
			return true;
		}
		return this.allowIfAllAbstainDecisions;
	}
}
