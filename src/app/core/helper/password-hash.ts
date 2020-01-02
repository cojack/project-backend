import crypto from 'crypto';

export function passwordHash(password: string, salt: string) {
	return crypto.createHmac('sha256', salt)
		.update(password, 'utf8')
		.digest('hex');
}

