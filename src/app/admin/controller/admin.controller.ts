import { Controller, Get, Render, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Action, Feature } from '@nestjsx/crud';

@UseGuards(AuthGuard('cookie'))
@Feature('admin')
@Controller('admin')
export class AdminController {
	@Action('index')
	@Render('@admin/index')
	@Get()
	public indexAction(): void {
		return;
	}
}
