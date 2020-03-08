export interface AccessDecisionManagerInterface {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	decide(token, attributes: any[], object: any): Promise<boolean>;
}
