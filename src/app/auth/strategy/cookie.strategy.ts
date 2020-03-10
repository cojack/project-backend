import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ConfigService } from '../../config';
import { AuthService } from '../auth.service';
import { JwtService } from '../jwt.service';
import { TokenDto } from '../dto';
import { RedirectStrategy } from './passport/redirect.strategy';
import { UserEntity } from '../../user/entity';

@Injectable()
export class CookieStrategy extends PassportStrategy(RedirectStrategy, 'cookie') {
	constructor(private readonly configService: ConfigService, private readonly jwtService: JwtService, private readonly authService: AuthService) {
		super({
			cookieName: configService.getEnv('APP_COOKIE_NAME'),
			redirectOnFail: '/admin/login'
		});
	}

	public async validate(cookie: string): Promise<UserEntity> {
		const { user } = await this.authService.validateToken({
			identity: cookie
		} as TokenDto);
		return user;
	}
}
