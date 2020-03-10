export interface AuthorizationCheckerInterface {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	isGranted(attributes: any[], subject?: any): Promise<boolean>;
}
