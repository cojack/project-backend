import Strategy from 'passport-cookie';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ConfigService } from '../../config';
import { AuthService } from '../auth.service';
import { JwtService } from '../jwt.service';

@Injectable()
export class CookieStrategy extends PassportStrategy(Strategy, 'cookie') {
	constructor(
		private readonly configService: ConfigService,
		private readonly jwtService: JwtService,
		private readonly authService: AuthService
	) {
		super({
			cookieName: configService.getEnv('APP_COOKIE_NAME')
		});
	}

	async validate(cookie: string) {
		console.log('a tu?');
		console.log(cookie);
		// const token = await this.jwtService.verifyToken(cookie, this.configService.getEnv('APP_SESSION_SECRET'));
		// const user = await this.authService.validateUser(token);
		if (!cookie) {
			throw new UnauthorizedException();
		}
		return true;
	}
}
