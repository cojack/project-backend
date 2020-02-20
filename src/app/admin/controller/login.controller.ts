import { Body, Controller, Get, Post, Render, Res } from '@nestjs/common';
import { Response } from 'express';
import { CredentialsDto } from '../../auth/dto';
import { ConfigService } from '../../config';
import { AuthService } from '../../auth';
import { PasswordPipe } from '../../auth/pipe/password.pipe';
import { AppLogger } from '../../app.logger';

@Controller('admin')
export class LoginController {
	private readonly logger = new AppLogger(LoginController.name);

	constructor(
		private readonly configService: ConfigService,
		private readonly authService: AuthService,
	) {
	}

	@Render('@admin/login')
	@Get('/login')
	public getLoginAction(): void {
	}

	@Post('/login')
	public async postLoginAction(@Body(PasswordPipe) credentials: CredentialsDto, @Res() res: Response): Promise<void> {
		try {
			const { user, authToken } = await this.authService.login(credentials);

			return res
				.cookie(this.configService.getEnv('APP_COOKIE_NAME'), authToken.uuid, { expires: authToken.expiresAt })
				.redirect('/admin');
		} catch (err) {
			this.logger.exception(err);
			return res.render('@admin/login', { err });
		}
	}
}
