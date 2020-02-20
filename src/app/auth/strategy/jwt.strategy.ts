import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../auth.service';
import { ConfigService } from '../../config';
import { TokenDto } from '../dto';
import { AppLogger } from '../../app.logger';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
	private readonly logger = new AppLogger(JwtStrategy.name);

	constructor(
		private readonly configService: ConfigService,
		private readonly authService: AuthService,
	) {
		super({
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			secretOrKey: configService.getEnv('APP_SESSION_SECRET'),
			issuer: configService.getEnv('APP_UUID'),
			audience: configService.getEnv('APP_SESSION_DOMAIN'),
		});
	}

	async validate(payload: TokenDto) {
		try {
			const { user } = await this.authService.validateToken(payload);
			return user;
		} catch (err) {
			this.logger.exception(err);
			throw new UnauthorizedException();
		}
	}
}
