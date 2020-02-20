import { AuthorizationChecker } from './authorization-checker';

class VoterRegistrySpy {
	getVoters = jest.fn(() => []);
}

class SessionServiceSpy {
	getUser = jest.fn();
}

describe(`AuthorizationChecker`, () => {
	let ac;

	beforeEach(() => {
		const vrs = new VoterRegistrySpy();
		const sss = new SessionServiceSpy();
		ac = new AuthorizationChecker(vrs as any);
	});

	it(`should be created`, () => {
		expect(ac).toBeTruthy();
	});

	it(`should allow access if empty voters`, async () => {
		expect.assertions(1);
		const result = await ac.isGranted({});
		expect(result).toBeTruthy();
	});

	it('should call isGranted method once', async () => {
		const isGrantedMock = spyOn(ac, 'isGranted');
		await ac.isGranted({});
		expect(isGrantedMock).toHaveBeenCalledTimes(1);
	});
});
