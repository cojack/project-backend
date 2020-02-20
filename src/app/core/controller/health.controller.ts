import { Controller, Get, HttpCode } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { HealthDto } from '../dto';

@ApiTags('health')
@Controller('health')
export class HealthController {
	private readonly startTime = Date.now();

	@Get()
	@HttpCode(200)
	@ApiResponse({ status: 200, description: 'OK', type: HealthDto })
	public indexAction(): HealthDto {
		return {
			uptime: Math.floor((Date.now() - this.startTime) / 1000),
			time: new Date()
		};
	}
}
