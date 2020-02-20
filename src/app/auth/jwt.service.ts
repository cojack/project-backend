import { Injectable } from '@nestjs/common';
import { sign, verify } from 'jsonwebtoken';
import { v4 } from 'uuid';
import { ConfigService } from '../config';
import { JwtDto, TokenDto } from './dto';

@Injectable()
export class JwtService {
	constructor(private readonly configService: ConfigService) {
	}

	public createAuthToken(): JwtDto {
		const expiresIn = this.configService.getEnv('APP_SESSION_TIMEOUT');
		const uuid = v4();
		const now = Math.floor(Date.now() / 1000);

		const accessToken = this.createToken({
			identity: uuid,
			iat: now,
		}, expiresIn, this.configService.getEnv('APP_SESSION_SECRET'));

		const refreshToken = this.createToken({
			identity: uuid,
			iat: now,
		}, this.configService.getEnv('APP_SESSION_REFRESH_TIMEOUT'), this.configService.getEnv('APP_SESSION_REFRESH_SECRET'));

		const expiresAt = new Date((now + expiresIn) * 1000);

		return {
			uuid,
			expiresAt,
			expiresIn,
			accessToken,
			refreshToken,
		};
	}

	private createToken(payload: object, expiresIn: number, secret: string): string {
		return sign(payload, secret, {
			expiresIn,
			audience: this.configService.getEnv('APP_SESSION_DOMAIN'),
			issuer: this.configService.getEnv('APP_UUID'),
		});
	}
}
