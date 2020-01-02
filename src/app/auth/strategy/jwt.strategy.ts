import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../auth.service';
import { ConfigService } from '../../config';
import { TokenDto } from '../dto';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
	constructor(
		private readonly configService: ConfigService,
		private readonly authService: AuthService
	) {
		super({
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			secretOrKey: configService.getEnv('APP_SESSION_SECRET'),
			issuer: configService.getEnv('APP_UUID'),
			audience: configService.getEnv('APP_SESSION_DOMAIN')
		});
	}

	async validate(payload: TokenDto) {
		console.log('a tu wchodzi?');
		/*const user = await this.authService.validateUser(payload);
		if (!user) {
			throw new UnauthorizedException();
		}*/
		return true;
	}
}
