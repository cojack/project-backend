import { Injectable } from '@nestjs/common';
import { sign, verify } from 'jsonwebtoken';
import { ConfigService } from '../config';
import { JwtDto, TokenDto } from './dto';

@Injectable()
export class JwtService {
	constructor(private readonly configService: ConfigService) {
	}

	public createAuthToken(id: string): JwtDto {
		const expiresIn = this.configService.getEnv('APP_SESSION_TIMEOUT');
		const accessToken = this.createToken(id, expiresIn, this.configService.getEnv('APP_SESSION_SECRET'));
		const refreshToken = this.createToken(id, this.configService.getEnv('APP_SESSION_REFRESH_TIMEOUT'), this.configService.getEnv('APP_SESSION_REFRESH_SECRET'));
		return {
			expiresIn,
			accessToken,
			refreshToken
		};
	}

	public verifyToken(token: string, secret: string): Promise<TokenDto> {
		return new Promise((resolve, reject) => {
			verify(token, secret, (err, decoded) => {
				if (err) {
					return reject(err);
				}
				resolve(decoded as TokenDto);
			});
		});
	}

	private createToken(id, expiresIn, secret) {
		return sign({id}, secret, {
			expiresIn,
			audience: this.configService.getEnv('APP_SESSION_DOMAIN'),
			issuer: this.configService.getEnv('APP_UUID')
		});
	}
}
