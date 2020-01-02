import { Controller, Get, Post, Query, Render } from '@nestjs/common';

@Controller('admin')
export class ReminderController {

	@Render('@admin/forgot-password')
	@Get('/forgot-password')
	public async getForgotPasswordAction(@Query('token') token: string) {
		return {token};
	}

	@Post('/forgot-password')
	public async postRegisterAction() {

	}
}
