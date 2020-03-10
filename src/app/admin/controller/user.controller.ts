import { Controller, Get, Render } from '@nestjs/common';

@Controller('admin/users')
export class UserController {
	@Render('@admin/user/index')
	@Get()
	public indexAction(): void {
		return;
	}
}
