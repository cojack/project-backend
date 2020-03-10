import { ApiProperty } from '@nestjs/swagger';

export class ExceptionDto {
	@ApiProperty()
	public statusCode: number;

	@ApiProperty()
	public error: string;

	@ApiProperty({
		required: false
	})
	public message: string;
}
