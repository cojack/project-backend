import { expose } from 'ssm-expose';

export async function awsSsmProvider(): Promise<void> {
	await expose();
}
