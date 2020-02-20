import { ApiProperty } from '@nestjs/swagger';

export class HealthDto {
	@ApiProperty()
	public readonly uptime: number;

	@ApiProperty()
	public readonly time: Date;
}
