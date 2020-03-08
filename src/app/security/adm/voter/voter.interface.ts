import { AccessEnum } from './access.enum';

export interface VoterInterface {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	vote(token: any, subject: any, attributes: any[]): Promise<AccessEnum>;
}
