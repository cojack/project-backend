import { Controller, Get, Post, Query, Render } from '@nestjs/common';

@Controller('admin')
export class ReminderController {

	@Render('@admin/forgot-password')
	@Get('/forgot-password')
	public getForgotPasswordAction(@Query('token') token: string): { token: string } {
		return { token };
	}

	@Post('/forgot-password')
	public postRegisterAction(): void {
		return;
	}
}
