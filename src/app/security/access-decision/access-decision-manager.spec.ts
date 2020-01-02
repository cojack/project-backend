import { AccessDecisionManager } from './access-decision-manager';
import { Voter } from '../voter';

describe('AccessDecisionManager', () => {
	let adm;
	const voters = new Set<Voter>();

	beforeEach(() => {
		voters.clear();
		adm = new AccessDecisionManager(voters);
	});

	it(`should create`, () => {
		expect(adm).toBeTruthy();
	});

	it(`should return false when empty voters`, async () => {
		expect.assertions(1);
		const result = await adm.decide({}, {}, {});
		expect(result).toBeFalsy();
	});

	it('should call decide() method once', async () => {
		const decideMock = spyOn(adm, 'decide');
		await adm.decide({}, {}, {});
		expect(decideMock).toHaveBeenCalledTimes(1);
	});

	it('should call decide() method and return value', async () => {
		const result = adm.decide({}, {}, {});
		expect(result).toBeTruthy();
	});

	it('should throw error when wrong strategy', async () => {
		adm['strategy'] = 'test';
		try {
			await adm.decide();
		} catch (err) {
			expect(err.message).toEqual('The strategy "test" is not supported.');
		}
	});
});
