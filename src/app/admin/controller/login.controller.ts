import { Body, Controller, Get, Post, Render, Res, Scope, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import { CredentialsDto } from '../../auth/dto';
import { ConfigService } from '../../config';
import { AuthService } from '../../auth';
import { PasswordPipe } from '../../auth/pipe/password.pipe';
import { CookieEntity } from '../entity/cookie.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Controller('admin')
export class LoginController {
	constructor(
		@InjectRepository(CookieEntity) private readonly cookieRepository: Repository<CookieEntity>,
		private readonly configService: ConfigService,
		private readonly authService: AuthService
	) {
	}

	@Render('@admin/login')
	@Get('/login')
	public getLoginAction() {
		return {};
	}

	@Render('@admin/login')
	@Post('/login')
	public async postLoginAction(@Body(PasswordPipe) credentials: CredentialsDto, @Res() res: Response) {
		try {
			const { user, authToken } = await this.authService.login(credentials);
			const cookieEntity = this.cookieRepository.create({
				token: authToken.accessToken,
				expiresAt: authToken.expiresIn,
				user
			});
			await this.cookieRepository.save(cookieEntity);
			res.cookie(this.configService.getEnv('APP_COOKIE_NAME'), authToken.accessToken);
			res.redirect('/admin');
		} catch (err) {
			return { err };
		}
	}
}
