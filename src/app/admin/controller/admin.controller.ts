import { Controller, Get, Render } from '@nestjs/common';

@Controller('admin')
export class AdminController {

	@Render('@admin/index')
	@Get()
	public indexAction() {

	}
}
