import { Voter } from './voter';
import { Injectable } from '@nestjs/common';

@Injectable()
export class VoterRegistry {
	private voters = new Set<Voter>();

	public register(voter: Voter): void {
		this.voters.add(voter);
	}

	public getVoters(): Set<Voter> {
		return this.voters;
	}
}
