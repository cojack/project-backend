import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Request, Response } from 'express';
import { ConfigService } from '../../config';
import { TokenRepository } from '../repository';

@Injectable()
export class CookieGuard implements CanActivate {
	constructor(
		private readonly configService: ConfigService,
		private readonly cookieRepository: TokenRepository,
	) {
	}

	public async canActivate(context: ExecutionContext): Promise<boolean> {
		const request: Request = context.switchToHttp().getRequest();
		const response: Response = context.switchToHttp().getResponse();
		const cookieName = this.configService.getEnv('APP_COOKIE_NAME');

		const uuid = request.cookies[cookieName];

		let cookie = await this.cookieRepository.findOne({ where: { uuid } });

		if (cookie.expiresAt > new Date()) {
			cookie = null;
		}

		if (!cookie) {
			response.clearCookie(cookieName).redirect('/admin/login');
		}

		return undefined;
	}

}
