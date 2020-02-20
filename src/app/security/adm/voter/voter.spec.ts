import { Voter } from './voter';

class VoterSpy extends Voter {
	supports = jest.fn();
	voteOnAttribute = jest.fn();
}

describe(`Voter`, () => {
	let voter;

	beforeEach(() => {
		voter = new VoterSpy();
	});

	it(`should create`, () => {
		expect(voter).toBeTruthy();
	});

	it('should call vote method once', () => {
		const voterMock = spyOn(voter, 'vote');
		voter.vote({});
		expect(voterMock).toHaveBeenCalledTimes(1);
	});
});
