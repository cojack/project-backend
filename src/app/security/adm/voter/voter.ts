import { VoterInterface } from './voter.interface';
import { AccessEnum } from './access.enum';
import { TokenStorageInterface } from '../authorization-checker';

export abstract class Voter implements VoterInterface {

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	public async vote(token: TokenStorageInterface, subject: any, attributes: any[]): Promise<AccessEnum> {
		let vote = AccessEnum.ACCESS_ABSTAIN;

		for (const attribute of attributes) {
			if (!this.supports(attribute, subject)) {
				continue;
			}
			// as soon as at least one attribute is supported, default is to deny access
			vote = AccessEnum.ACCESS_DENIED;
			if (await this.voteOnAttribute(attribute, subject, token)) {
				// grant access as soon as at least one attribute returns a positive response
				return AccessEnum.ACCESS_GRANTED;
			}
		}

		return vote;
	}

	protected abstract supports(attribute, subject): boolean;

	protected async abstract voteOnAttribute(attribute, subject, token: TokenStorageInterface): Promise<boolean>;

}
