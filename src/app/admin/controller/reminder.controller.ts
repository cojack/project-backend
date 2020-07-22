import { Controller, Get, Post, Query, Render } from '@nestjs/common';
import { Action, Feature } from '@nestjsx/crud';

@Feature('admin')
@Controller('admin')
export class ReminderController {
	@Action('show-forgot-password')
	@Render('@admin/forgot-password')
	@Get('/forgot-password')
	public getForgotPasswordAction(@Query('token') token: string): { token: string } {
		return { token };
	}

	@Action('handle-forgot-password')
	@Post('/forgot-password')
	public postRegisterAction(): void {
		return;
	}
}
