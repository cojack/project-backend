import { Controller, Get, Render, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@UseGuards(AuthGuard('cookie'))
@Controller('admin')
export class AdminController {
	@Render('@admin/index')
	@Get()
	public indexAction(): void {
		return;
	}
}
